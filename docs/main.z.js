export let three = await import('./three.module.js');
export let rounded_box_geometry = await import('./three/RoundedBoxGeometry.js');
export let effect_composer_lib = await import('./three/EffectComposer.js');
export let render_pass_lib = await import('./three/RenderPass.js');
export let outline_pass_lib = await import('./three/OutlinePass.js');
export let output_pass_lib = await import('./three/OutputPass.js');
import { droid as new_droid } from './droid.z.js';
import { ui_start } from './ui.z.js';
export let zoom_min = 1;
export let zoom_max = 4;
export let brick_size = 2;
export const clamp = ($_38, $_39, $_40) => {
    if ($_38 < $_39)
        return $_39;
    if ($_38 > $_40)
        return $_40;
    return $_38;
};
export const wave = ($_41) => {
    return Math.sin($_41 * Math.PI * 2 - Math.PI * 0.5) * 0.5 + 0.5;
};
export const ease_out_cubic = ($_41) => {
    let $_43 = $_41 - 1;
    return $_43 * $_43 * $_43 * $_43 * $_43 + 1;
};
export const diff = ($_44, $_45) => {
    return $_44 > $_45 ? $_44 - $_45 : ($_45 - $_44) * -1;
};
export const rescale = ($_38, $_46, $_47, $_48, $_49) => {
    let $_44 = $_47 - $_46;
    let $_45 = $_49 - $_48;
    return ($_38 - $_46) * $_45 / $_44 + $_48;
};
export const move_camera = ($_50, $_51, $_52) => {
    $_51.lookAt($_52);
    $_51.updateProjectionMatrix();
    let $_38 = diff($_50.position.x, $_51.position.x);
    let $_53 = diff($_50.position.y, $_51.position.y);
    let $_54 = diff($_50.position.z, $_51.position.z);
    let $_55 = diff($_50.zoom, $_51.zoom);
    $_50.position.x += -$_38 * 0.1;
    $_50.position.y += -$_53 * 0.1;
    $_50.position.z += -$_54 * 0.1;
    let $_56 = Math.abs($_38) + Math.abs($_53) + Math.abs($_54);
    if ($_56 > 2)
        $_56 = 2;
    let $_57 = rescale($_56, 0, 2, 0.02, 0.1);
    $_50.quaternion.slerp($_51.quaternion, $_57);
    $_50.zoom += -$_55 * 0.1;
    return $_50.updateProjectionMatrix();
};
export const rotate_camera = ($_50, $_58) => {
    let $_59 = new three.Matrix4();
    $_59.makeRotationY($_58);
    return $_50.position.applyMatrix4($_59);
};
export const cursor_put = ($_52, $_60) => {
    let $_61 = [];
    for (let $_62 = 0; $_62 < $_60.length; $_62 += 1) {
        let $_63 = $_60[$_62];
        if ($_52.x === $_63.position.x && $_52.z === $_63.position.z) {
            $_61.push($_63.position.y);
        }
    }
    for (let $_62 = 0; $_62 < 100; $_62 += 1) {
        let $_53 = $_52.y + 2 * $_62;
        let $_64 = true;
        for (let $_66 = 0; $_66 < $_61.length; $_66 += 1) {
            if ($_61[$_66] === $_53) {
                $_64 = false;
                break;
            }
        }
        if ($_64)
            return $_53;
    }
    return $_52.y - 2;
};
export const cursor_off = ($_52, $_60) => {
    let $_61 = [];
    for (let $_62 = 0; $_62 < $_60.length; $_62 += 1) {
        let $_63 = $_60[$_62];
        if ($_52.x === $_63.position.x && $_52.z === $_63.position.z && $_63.position.y <= $_52.y) {
            $_61.push($_63);
        }
    }
    let $_68 = $_61.toSorted(($_44, $_45) => $_44.position.y < $_45.position.y).map(($_69) => $_69.position.y);
    $_68 = [-1].concat($_68);
    if ($_68.length > 0) {
        return $_68.at(-1) + 2;
    }
    return $_52.y;
};
export const texture = ($_70) => {
    let $_71 = new three.TextureLoader().load($_70);
    $_71.colorSpace = three.SRGBColorSpace;
    return $_71;
};
export let brick_bump = new three.TextureLoader().load('bricks/bump.png');
export let brick_red = texture('bricks/red.png');
export let brick_orange = texture('bricks/orange.png');
export let brick_yellow = texture('bricks/yellow.png');
export let brick_green = texture('bricks/green.png');
export let brick_blue = texture('bricks/blue.png');
export let brick_rbow = texture('bricks/rbow.png');
export let brick_white = texture('bricks/white.png');
export const texture_to_n = ($_71) => {
    if ($_71 === brick_red)
        return 0;
    if ($_71 === brick_orange)
        return 1;
    if ($_71 === brick_yellow)
        return 2;
    if ($_71 === brick_green)
        return 3;
    if ($_71 === brick_blue)
        return 4;
    if ($_71 === brick_rbow)
        return 5;
    if ($_71 === brick_white)
        return 6;
    return 0;
};
export const n_to_texture = ($_72) => {
    if ($_72 === 0)
        return brick_red;
    if ($_72 === 1)
        return brick_orange;
    if ($_72 === 2)
        return brick_yellow;
    if ($_72 === 3)
        return brick_green;
    if ($_72 === 4)
        return brick_blue;
    if ($_72 === 5)
        return brick_rbow;
    if ($_72 === 6)
        return brick_white;
    return brick_red;
};
export const new_brick = ($_38, $_53, $_54, $_72) => {
    let $_73 = new rounded_box_geometry.RoundedBoxGeometry(2, 2, 2, 2, 0.2);
    let $_74 = new three.MeshLambertMaterial({ map: n_to_texture($_72), bumpMap: brick_bump, bumpScale: 2.5 });
    let $_69 = new three.Mesh($_73, $_74);
    $_69.position.set($_38, $_53, $_54);
    $_69.userData.box = new three.Mesh(new three.BoxGeometry(2, 2, 2), $_74);
    $_69.userData.box.position.copy($_69.position);
    $_69.userData.box.updateMatrixWorld();
    return $_69;
};
export const move_droid_y = ($_75, $_60) => {
    let $_61 = [];
    for (let $_62 = 0; $_62 < $_60.length; $_62 += 1) {
        let $_63 = $_60[$_62];
        if (Math.abs(diff($_75.x, $_63.position.x)) < 1 && Math.abs(diff($_75.z, $_63.position.z)) < 1 && $_63.position.y <= $_75.y) {
            $_61.push($_63.position.y);
        }
    }
    let $_68 = $_61.toSorted(($_44, $_45) => $_44 < $_45);
    $_68 = [-1].concat($_68);
    if ($_68.length > 0) {
        return $_68.at(-1) + 2;
    }
    return $_75.y;
};
export const move_droid = ($_76, $_52, $_60) => {
    if ($_76.position.x === $_52.x && $_76.position.y === $_52.y && $_76.position.z === $_52.z) {
        return;
    }
    if ($_76.position.z !== $_52.z) {
        let $_77 = diff($_76.position.z, $_52.z);
        $_76.position.z += -$_77 * 0.1;
        if (Math.abs($_77) < 0.1) {
            $_76.position.z = $_52.z;
        }
        $_76.position.y = move_droid_y($_76.position, $_60);
        return;
    }
    if ($_76.position.x !== $_52.x) {
        let $_78 = diff($_76.position.x, $_52.x);
        $_76.position.x += -$_78 * 0.1;
        if (Math.abs($_78) < 0.1) {
            $_76.position.x = $_52.x;
        }
        $_76.position.y = move_droid_y($_76.position, $_60);
        return;
    }
    if ($_76.position.y !== $_52.y) {
        let $_79 = diff($_76.position.y, $_52.y);
        $_76.position.y += -$_79 * 0.1;
        if (Math.abs($_79) < 0.1) {
            $_76.position.y = $_52.y;
        }
        return;
    }
};
export const set_animation = ($_76, $_80) => {
    if ($_76.mesh.position.x === $_80.x && $_76.mesh.position.y === $_80.y && $_76.mesh.position.z === $_80.z) {
        let $_81 = $_76.anim_get();
        if ($_81 !== 'guard') {
            $_76.anim_set('guard');
        }
        return;
    }
    let $_78 = diff($_76.mesh.position.x, $_80.x);
    let $_79 = diff($_76.mesh.position.y, $_80.y);
    let $_77 = diff($_76.mesh.position.z, $_80.z);
    let $_56 = Math.abs($_78) + Math.abs($_79) + Math.abs($_77);
    if ($_56 > 0.1) {
        if ($_76.anim_get() !== 'run')
            $_76.anim_set('run');
    }
    else {
        if ($_76.anim_get() !== 'walk')
            $_76.anim_set('walk');
    }
    let $_82 = 1000;
    if ($_78 > 0)
        $_76.mesh.lookAt($_76.mesh.position.x + $_82, $_76.mesh.position.y, $_76.mesh.position.z);
    if ($_78 < 0)
        $_76.mesh.lookAt($_76.mesh.position.x - $_82, $_76.mesh.position.y, $_76.mesh.position.z);
    if ($_77 > 0)
        $_76.mesh.lookAt($_76.mesh.position.x, $_76.mesh.position.y, $_76.mesh.position.z + $_82);
    if ($_77 < 0)
        $_76.mesh.lookAt($_76.mesh.position.x, $_76.mesh.position.y, $_76.mesh.position.z - $_82);
    return 0;
};
export const run = () => {
    let $_50 = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    $_50.position.set(20, 32, 52);
    $_50.lookAt(0, 0, 0);
    let $_84 = new three.PerspectiveCamera().copy($_50);
    $_84.zoom = zoom_max - zoom_min;
    let $_85 = new three.Scene();
    $_85.background = new three.Color(0xFFFFFF);
    let $_86 = new three.BoxGeometry(2, 2, 2);
    let $_87 = 1;
    let $_88 = new three.MeshBasicMaterial({ opacity: $_87, side: three.DoubleSide, transparent: true, map: new three.TextureLoader().load('cursor.png'), polygonOffset: true, polygonOffsetFactor: (-4) });
    let $_89 = new three.Mesh($_86, $_88);
    $_89.position.set(1, 1, 1);
    $_85.add($_89);
    localStorage.removeItem('bricks');
    let $_60 = [];
    if (localStorage.getItem('bricks')) {
        let $_91 = localStorage.getItem('bricks');
        JSON.parse($_91).forEach(($_93) => {
            let $_63 = new_brick($_93[0], $_93[1], $_93[2], $_93[3]);
            $_60.push($_63);
            return $_85.add($_63);
        });
        $_89.position.y = cursor_put($_89.position, $_60);
    }
    let $_94 = new three.PlaneGeometry(40, 40);
    $_94.rotateX(-Math.PI / 2);
    let $_95 = texture('floor.png');
    let $_96 = new three.Mesh($_94, new three.MeshBasicMaterial({ map: $_95, depthWrite: false }));
    $_96.position.set(-0.05, 0, -0.1);
    $_85.add($_96);
    let $_76 = new_droid('droids/dott');
    $_76.mesh.position.copy($_89.position);
    $_85.add($_76.mesh);
    let $_98 = new three.DirectionalLight(0xffffff, Math.PI);
    $_85.add($_98);
    let $_99 = new three.WebGLRenderer({ antialias: true });
    $_99.outputEncoding = three.sRGBEncoding;
    $_99.setPixelRatio(window.devicePixelRatio);
    $_99.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild($_99.domElement);
    $_99.domElement.style.position = 'absolute';
    $_99.domElement.style.top = '0';
    ui_start(($_102, $_103) => {
        if ($_102 === 'angle')
            rotate_camera($_84, $_103 * 0.025);
        if ($_102 === 'zoom')
            $_84.zoom = rescale($_103, -1, 1, zoom_min, zoom_max);
        if ($_102 === 'brick') {
            let $_104 = new_brick($_89.position.x, $_89.position.y, $_89.position.z, $_103);
            $_85.add($_104);
            $_60.push($_104);
            $_89.position.y = cursor_put($_89.position, $_60);
        }
    });
    let $_105 = new effect_composer_lib.EffectComposer($_99);
    let $_106 = new render_pass_lib.RenderPass($_85, $_50);
    $_105.addPass($_106);
    let $_107 = new outline_pass_lib.OutlinePass(new three.Vector2(window.innerWidth, window.innerHeight), $_85, $_50);
    $_105.addPass($_107);
    $_107.selectedObjects = [$_76.mesh];
    $_107.visibleEdgeColor = new three.Color(0);
    $_107.hiddenEdgeColor = new three.Color(0);
    $_107.edgeStrength = 5 * 20;
    $_107.edgeThickness = 2.5;
    $_107.overlayMaterial.blending = three.CustomBlending;
    let $_108 = new output_pass_lib.OutputPass();
    $_105.addPass($_108);
    $_99.domElement.onclick = ($_93) => {
        let $_109 = new three.Vector2();
        $_109.set($_93.clientX / window.innerWidth * 2 - 1, -($_93.clientY / window.innerHeight) * 2 + 1);
        let $_110 = new three.Raycaster();
        $_110.setFromCamera($_109, $_50);
        let $_111 = [];
        $_60.forEach(($_63) => {
            return $_111.push($_63.userData.box);
        });
        $_111.push($_96);
        let $_112 = $_110.intersectObjects($_111, false);
        if ($_112.length === 0)
            return;
        let $_113 = $_112[0];
        $_89.position.copy($_113.point).add($_113.face.normal);
        $_89.position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);
        return $_87 = 0.5;
    };
    window.onkeyup = ($_93) => {
        if ($_93.code === 'KeyE') {
            for (let $_62 = 0; $_62 < $_60.length; $_62 += 1) {
                let $_63 = $_60[$_62];
                if ($_63.position.x === $_89.position.x && $_63.position.z === $_89.position.z && $_63.position.y === $_89.position.y - 2) {
                    $_60 = $_60.slice(0, $_62).concat($_60.slice($_62 + 1));
                    $_85.remove($_63);
                    $_89.position.y = cursor_off($_89.position, $_60);
                    break;
                }
            }
        }
    };
    window.onresize = () => {
        $_50.aspect = window.innerWidth / window.innerHeight;
        $_50.updateProjectionMatrix();
        $_84.copy($_50);
        $_99.setSize(window.innerWidth, window.innerHeight);
        return $_105.setSize(window.innerWidth, window.innerHeight);
    };
    setInterval(() => {
        let $_91 = $_60.map(($_63) => [$_63.position.x, $_63.position.y, $_63.position.z, texture_to_n($_63.material.map)]);
        return localStorage.setItem('bricks', JSON.stringify($_91));
    }, 5000);
    let $_115 = Date.now();
    let $_117 = () => {
        let $_118 = (Date.now() - $_115) * 0.001;
        $_115 = Date.now();
        $_87 += $_118;
        $_88.opacity = ease_out_cubic(wave($_87));
        $_76.update($_118);
        move_camera($_50, $_84, $_89.position);
        let $_80 = new three.Vector3().copy($_76.mesh.position);
        move_droid($_76.mesh, $_89.position, $_60);
        set_animation($_76, $_80);
        $_98.position.copy($_50.position);
        $_105.render();
        return requestAnimationFrame($_117);
    };
    return $_117();
};
