import ARScene from "@/components/ARScene";
import Scene from "@/components/Scene";

export default [
    { name: 'scene', path: '*', component: Scene, props: true },
    { name: 'ar-scene', path: '/ar-scene', component: ARScene, props: true },
]
