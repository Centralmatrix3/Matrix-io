/*
 * @name = TestFlight
 * @desc = TestFlight强制安装
 * @author = Skyxim
----------------------------------------
http:
  script:
    - match: ^https:\/\/testflight\.apple\.com((\/v3\/accounts\/.+?\/apps$)|(\/v2\/accounts\/.+?\/apps\/.+?\/builds\/.+))
      name: TF强制安装
      type: response
      require-body: true
      timeout: 120

  mitm:
    - "testflight.apple.com"

script-providers:
  TF强制安装:
    url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Stash/Scripts/TestFlightX.js
    interval: 86400
----------------------------------------
*/

const url = $request.url
 const responseBody = $response.body
 
     ; (async () => {
         const regeList = /.*?\/v3\/accounts\/.+?\/apps$/
         const regeMainPage = /.*?\/v2\/accounts\/.+?\/apps\/.+?\/builds\/.+/
         const regBiulds = /.*?\/v2\/accounts\/.+?\/apps\/.+?\/platforms\/ios\/trains\/.+?\/builds/
         if (regeList.test(url)) {
             $done({ body: list(responseBody) })
             return
         }
 
         if (regeMainPage.test(url)) {
             if (url.endsWith("install")) {
                 console.log("is install")
                 $done({ body: responseBody })
                 return
             }
 
             $done({ body: info(responseBody) })
             return
         }
 
         if (regBiulds.test(url)) {
             $done({ body: builds(responseBody) })
             return
         }
     })()
         .catch(error => {
             console.log(error)
         }).finally(() => $done())
 
 function info(responseBody) {
     let body = JSON.parse(responseBody)
     let family = {
         "name": "Mac",
         "unsupportedDevices": [
         ],
         "minimumSupportedDevice": null
     }
 
     for (const build of body.data.builds) {
         build.platformCompatible = true
         build.hardwareCompatible = true
         build.compatible = true
         build.permission = "install"
 
 
         build.compatibilityData.compatibleDeviceFamilies.push(family)
     }
 
     let build = body.data.currentBuild
     build.platformCompatible = true
     build.hardwareCompatible = true
     build.compatible = true
     build.permission = "install"
 
 
     build.compatibilityData.compatibleDeviceFamilies.push(family)
     return JSON.stringify(body)
 }
 
 function list(responseBody) {
     if (responseBody === "") {
         $done({ body: responseBody })
     }
 
     let body = JSON.parse(responseBody)
 
     for (const app of body.data) {
         for (const p of app.platforms) {
             if (p.name === "ios") {
                 console.log(p.build.name)
                 p.build.hardwareCompatible = true
                 p.build.compatible = true
             }
         }
     }
 
     return JSON.stringify(body)
 }
 
 function builds(responseBody) {
     let body = JSON.parse(responseBody)
     if (body.error === null) {
         for (const build of body.data) {
             if (build.platform === "ios") {
                 build.compatible = true
             }
         }
     }
 
     return JSON.stringify(body)
 }