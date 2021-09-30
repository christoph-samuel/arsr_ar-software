setTimeout(() => {
    var vidCam = document.body.lastElementChild;
    vidCam.setAttribute('id', 'arVideo')
    var camera = document.querySelector('[camera]')
    webCamSource = document.createElement('a-entity')
    webCamSource.setAttribute('geometry', 'primitive: plane;')
    webCamSource.setAttribute('material', 'shader: flat; src: #arVideo')
    webCamSource.setAttribute('position', '00 0 -40')
    webCamSource.setAttribute('scale', '54 36 1')
    camera.insertBefore(webCamSource, camera.firstChild);
    document.querySelector('.a-enter-vr-button').addEventListener('click', () => {
        camera.object3D.position.set(0, 0, 0)
    })
}, 2000);