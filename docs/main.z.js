export let three = await import('./three.module.js');
export let effect_composer_lib = await import('./three/EffectComposer.js');
export let render_pass_lib = await import('./three/RenderPass.js');
export let outline_pass_lib = await import('./three/OutlinePass.js');
export let output_pass_lib = await import('./three/OutputPass.js');
import { droid as new_droid } from './droid.z.js';
import { ui_start } from './ui.z.js';
export let zoom_min = 1;
export let zoom_max = 4;
export let brick_size = 2;
export const clamp = ($_36, $_37, $_38) => {
    if ($_36 < $_37)
        return $_37;
    if ($_36 > $_38)
        return $_38;
    return $_36;
};
export const wave = ($_39) => {
    return Math.sin($_39 * Math.PI * 2 - Math.PI * 0.5) * 0.5 + 0.5;
};
export const ease_out_cubic = ($_39) => {
    let $_41 = $_39 - 1;
    return $_41 * $_41 * $_41 * $_41 * $_41 + 1;
};
export const diff = ($_42, $_43) => {
    return $_42 > $_43 ? $_42 - $_43 : ($_43 - $_42) * -1;
};
export const rescale = ($_36, $_44, $_45, $_46, $_47) => {
    let $_42 = $_45 - $_44;
    let $_43 = $_47 - $_46;
    return ($_36 - $_44) * $_43 / $_42 + $_46;
};
export const move_camera = ($_48, $_49, $_50) => {
    $_49.lookAt($_50);
    $_49.updateProjectionMatrix();
    let $_36 = diff($_48.position.x, $_49.position.x);
    let $_51 = diff($_48.position.y, $_49.position.y);
    let $_52 = diff($_48.position.z, $_49.position.z);
    let $_53 = diff($_48.zoom, $_49.zoom);
    $_48.position.x += -$_36 * 0.1;
    $_48.position.y += -$_51 * 0.1;
    $_48.position.z += -$_52 * 0.1;
    let $_54 = Math.abs($_36) + Math.abs($_51) + Math.abs($_52);
    if ($_54 > 2)
        $_54 = 2;
    let $_55 = rescale($_54, 0, 2, 0.02, 0.1);
    $_48.quaternion.slerp($_49.quaternion, $_55);
    $_48.zoom += -$_53 * 0.1;
    return $_48.updateProjectionMatrix();
};
export const rotate_camera = ($_48, $_56) => {
    let $_57 = new three.Matrix4();
    $_57.makeRotationY($_56);
    return $_48.position.applyMatrix4($_57);
};
export const cursor_put = ($_50, $_58) => {
    let $_59 = [];
    for (let $_60 = 0; $_60 < $_58.length; $_60 += 1) {
        let $_61 = $_58[$_60];
        if ($_50.x === $_61.position.x && $_50.z === $_61.position.z) {
            $_59.push($_61.position.y);
        }
    }
    for (let $_60 = 0; $_60 < 100; $_60 += 1) {
        let $_51 = $_50.y + 2 * $_60;
        let $_62 = true;
        for (let $_64 = 0; $_64 < $_59.length; $_64 += 1) {
            if ($_59[$_64] === $_51) {
                $_62 = false;
                break;
            }
        }
        if ($_62)
            return $_51;
    }
    return $_50.y - 2;
};
export const cursor_off = ($_50, $_58) => {
    let $_59 = [];
    for (let $_60 = 0; $_60 < $_58.length; $_60 += 1) {
        let $_61 = $_58[$_60];
        if ($_50.x === $_61.position.x && $_50.z === $_61.position.z && $_61.position.y <= $_50.y) {
            $_59.push($_61);
        }
    }
    let $_66 = $_59.toSorted(($_42, $_43) => $_42.position.y < $_43.position.y).map(($_67) => $_67.position.y);
    $_66 = [-1].concat($_66);
    if ($_66.length > 0) {
        return $_66.at(-1) + 2;
    }
    return $_50.y;
};
export const texture = ($_68) => {
    let $_69 = new three.TextureLoader().load($_68);
    $_69.colorSpace = three.SRGBColorSpace;
    return $_69;
};
export let brick_bump = new three.TextureLoader().load('bricks/bump.png');
export let brick_red = texture('bricks/red.png');
export let brick_orange = texture('bricks/orange.png');
export let brick_yellow = texture('bricks/yellow.png');
export let brick_green = texture('bricks/green.png');
export let brick_blue = texture('bricks/blue.png');
export let brick_white = texture('bricks/white.png');
export const texture_to_n = ($_69) => {
    if ($_69 === brick_red)
        return 0;
    if ($_69 === brick_orange)
        return 1;
    if ($_69 === brick_yellow)
        return 2;
    if ($_69 === brick_green)
        return 3;
    if ($_69 === brick_blue)
        return 4;
    if ($_69 === brick_white)
        return 5;
    return 0;
};
export const n_to_texture = ($_70) => {
    if ($_70 === 0)
        return brick_red;
    if ($_70 === 1)
        return brick_orange;
    if ($_70 === 2)
        return brick_yellow;
    if ($_70 === 3)
        return brick_green;
    if ($_70 === 4)
        return brick_blue;
    if ($_70 === 5)
        return brick_white;
    return brick_red;
};
export const new_brick = ($_36, $_51, $_52, $_70) => {
    let $_71 = new three.BoxGeometry(2, 2, 2);
    let $_72 = new three.MeshLambertMaterial({ map: n_to_texture($_70), bumpMap: brick_bump, bumpScale: 2.5 });
    let $_67 = new three.Mesh($_71, $_72);
    $_67.position.set($_36, $_51, $_52);
    return $_67;
};
export const move_droid_y = ($_73, $_58) => {
    let $_59 = [];
    for (let $_60 = 0; $_60 < $_58.length; $_60 += 1) {
        let $_61 = $_58[$_60];
        if (Math.abs(diff($_73.x, $_61.position.x)) < 1 && Math.abs(diff($_73.z, $_61.position.z)) < 1 && $_61.position.y <= $_73.y) {
            $_59.push($_61.position.y);
        }
    }
    let $_66 = $_59.toSorted(($_42, $_43) => $_42 < $_43);
    $_66 = [-1].concat($_66);
    if ($_66.length > 0) {
        return $_66.at(-1) + 2;
    }
    return $_73.y;
};
export const move_droid = ($_74, $_50, $_58) => {
    if ($_74.position.x === $_50.x && $_74.position.y === $_50.y && $_74.position.z === $_50.z) {
        return;
    }
    if ($_74.position.z !== $_50.z) {
        let $_75 = diff($_74.position.z, $_50.z);
        $_74.position.z += -$_75 * 0.1;
        if (Math.abs($_75) < 0.1) {
            $_74.position.z = $_50.z;
        }
        $_74.position.y = move_droid_y($_74.position, $_58);
        return;
    }
    if ($_74.position.x !== $_50.x) {
        let $_76 = diff($_74.position.x, $_50.x);
        $_74.position.x += -$_76 * 0.1;
        if (Math.abs($_76) < 0.1) {
            $_74.position.x = $_50.x;
        }
        $_74.position.y = move_droid_y($_74.position, $_58);
        return;
    }
    if ($_74.position.y !== $_50.y) {
        let $_77 = diff($_74.position.y, $_50.y);
        $_74.position.y += -$_77 * 0.1;
        if (Math.abs($_77) < 0.1) {
            $_74.position.y = $_50.y;
        }
        return;
    }
};
export const set_animation = ($_74, $_78) => {
    if ($_74.mesh.position.x === $_78.x && $_74.mesh.position.y === $_78.y && $_74.mesh.position.z === $_78.z) {
        let $_79 = $_74.anim_get();
        if ($_79 !== 'guard') {
            $_74.anim_set('guard');
        }
        return;
    }
    let $_76 = diff($_74.mesh.position.x, $_78.x);
    let $_77 = diff($_74.mesh.position.y, $_78.y);
    let $_75 = diff($_74.mesh.position.z, $_78.z);
    let $_54 = Math.abs($_76) + Math.abs($_77) + Math.abs($_75);
    if ($_54 > 0.1) {
        if ($_74.anim_get() !== 'run')
            $_74.anim_set('run');
    }
    else {
        if ($_74.anim_get() !== 'walk')
            $_74.anim_set('walk');
    }
    let $_80 = 1000;
    if ($_76 > 0)
        $_74.mesh.lookAt($_74.mesh.position.x + $_80, $_74.mesh.position.y, $_74.mesh.position.z);
    if ($_76 < 0)
        $_74.mesh.lookAt($_74.mesh.position.x - $_80, $_74.mesh.position.y, $_74.mesh.position.z);
    if ($_75 > 0)
        $_74.mesh.lookAt($_74.mesh.position.x, $_74.mesh.position.y, $_74.mesh.position.z + $_80);
    if ($_75 < 0)
        $_74.mesh.lookAt($_74.mesh.position.x, $_74.mesh.position.y, $_74.mesh.position.z - $_80);
    return 0;
};
export const run = () => {
    let $_48 = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    $_48.position.set(20, 32, 52);
    $_48.lookAt(0, 0, 0);
    let $_82 = new three.PerspectiveCamera().copy($_48);
    $_82.zoom = zoom_max - zoom_min;
    let $_83 = new three.Scene();
    $_83.background = new three.Color(0xFFFFFF);
    let $_84 = new three.BoxGeometry(2, 2, 2);
    let $_85 = 1;
    let $_86 = new three.MeshBasicMaterial({ opacity: $_85, side: three.DoubleSide, transparent: true, map: new three.TextureLoader().load('cursor.png'), polygonOffset: true, polygonOffsetFactor: (-4) });
    let $_87 = new three.Mesh($_84, $_86);
    $_87.position.set(1, 1, 1);
    $_83.add($_87);
    localStorage.removeItem('bricks');
    let $_58 = [];
    if (localStorage.getItem('bricks')) {
        let $_89 = localStorage.getItem('bricks');
        JSON.parse($_89).forEach(($_91) => {
            let $_61 = new_brick($_91[0], $_91[1], $_91[2], $_91[3]);
            $_58.push($_61);
            return $_83.add($_61);
        });
        $_87.position.y = cursor_put($_87.position, $_58);
    }
    let $_92 = new three.PlaneGeometry(40, 40);
    $_92.rotateX(-Math.PI / 2);
    let $_93 = texture('floor.png');
    let $_94 = new three.Mesh($_92, new three.MeshBasicMaterial({ map: $_93, depthWrite: false }));
    $_94.position.set(-0.05, 0, -0.1);
    $_83.add($_94);
    let $_74 = new_droid('droids/dott');
    $_74.mesh.position.copy($_87.position);
    $_83.add($_74.mesh);
    let $_96 = new three.DirectionalLight(0xffffff, Math.PI);
    $_83.add($_96);
    let $_97 = new three.WebGLRenderer({ antialias: true });
    $_97.outputEncoding = three.sRGBEncoding;
    $_97.setPixelRatio(window.devicePixelRatio);
    $_97.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild($_97.domElement);
    $_97.domElement.style.position = 'absolute';
    $_97.domElement.style.top = '0';
    ui_start(($_100, $_101) => {
        if ($_100 === 'angle')
            rotate_camera($_82, $_101 * 0.025);
        if ($_100 === 'zoom')
            $_82.zoom = rescale($_101, -1, 1, zoom_min, zoom_max);
        if ($_100 === 'brick') {
            let $_102 = new_brick($_87.position.x, $_87.position.y, $_87.position.z, $_101);
            $_83.add($_102);
            $_58.push($_102);
            $_87.position.y = cursor_put($_87.position, $_58);
        }
    });
    let $_103 = new effect_composer_lib.EffectComposer($_97);
    let $_104 = new render_pass_lib.RenderPass($_83, $_48);
    $_103.addPass($_104);
    let $_105 = new outline_pass_lib.OutlinePass(new three.Vector2(window.innerWidth, window.innerHeight), $_83, $_48);
    $_103.addPass($_105);
    $_105.selectedObjects = [$_74.mesh];
    $_105.visibleEdgeColor = new three.Color(0);
    $_105.hiddenEdgeColor = new three.Color(0);
    $_105.edgeStrength = 5 * 20;
    $_105.edgeThickness = 2.5;
    $_105.overlayMaterial.blending = three.CustomBlending;
    let $_106 = new output_pass_lib.OutputPass();
    $_103.addPass($_106);
    $_97.domElement.onclick = ($_91) => {
        let $_107 = new three.Vector2();
        $_107.set($_91.clientX / window.innerWidth * 2 - 1, -($_91.clientY / window.innerHeight) * 2 + 1);
        let $_108 = new three.Raycaster();
        $_108.setFromCamera($_107, $_48);
        let $_109 = $_108.intersectObjects($_58.concat([$_94]), false);
        if ($_109.length === 0)
            return;
        let $_110 = $_109[0];
        $_87.position.copy($_110.point).add($_110.face.normal);
        $_87.position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);
        return $_85 = 0.5;
    };
    window.onkeyup = ($_91) => {
        if ($_91.code === 'KeyE') {
            for (let $_60 = 0; $_60 < $_58.length; $_60 += 1) {
                let $_61 = $_58[$_60];
                if ($_61.position.x === $_87.position.x && $_61.position.z === $_87.position.z && $_61.position.y === $_87.position.y - 2) {
                    $_58 = $_58.slice(0, $_60).concat($_58.slice($_60 + 1));
                    $_83.remove($_61);
                    $_87.position.y = cursor_off($_87.position, $_58);
                    break;
                }
            }
        }
    };
    window.onresize = () => {
        $_48.aspect = window.innerWidth / window.innerHeight;
        $_48.updateProjectionMatrix();
        $_82.copy($_48);
        $_97.setSize(window.innerWidth, window.innerHeight);
        return $_103.setSize(window.innerWidth, window.innerHeight);
    };
    setInterval(() => {
        let $_89 = $_58.map(($_61) => [$_61.position.x, $_61.position.y, $_61.position.z, texture_to_n($_61.material.map)]);
        return localStorage.setItem('bricks', JSON.stringify($_89));
    }, 5000);
    let $_112 = Date.now();
    let $_114 = () => {
        let $_115 = (Date.now() - $_112) * 0.001;
        $_112 = Date.now();
        $_85 += $_115;
        $_86.opacity = ease_out_cubic(wave($_85));
        $_74.update($_115);
        move_camera($_48, $_82, $_87.position);
        let $_78 = new three.Vector3().copy($_74.mesh.position);
        move_droid($_74.mesh, $_87.position, $_58);
        set_animation($_74, $_78);
        $_96.position.copy($_48.position);
        $_103.render();
        return requestAnimationFrame($_114);
    };
    return $_114();
};
