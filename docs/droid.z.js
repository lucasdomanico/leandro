export let three = await import('./three.module.js');
export const wave = ($_20) => {
    return Math.sin($_20 * Math.PI * 2 - Math.PI * 0.5) * 0.5 + 0.5;
};
export class Droid {
    anim_get;
    anim_set;
    update;
    mesh;
    constructor(anim_get, anim_set, update, mesh) {
        this.anim_get = anim_get;
        this.anim_set = anim_set;
        this.update = update;
        this.mesh = mesh;
    }
    static struct = (o) => {
        return new Droid(o.anim_get, o.anim_set, o.update, o.mesh);
    };
}
export const target_move = ($_22, $_23, $_24, $_25, $_26) => {
    if ($_22 > $_25()) {
        $_26($_25() + $_24 * $_23);
        if ($_22 < $_25()) {
            $_26($_22);
        }
    }
    else if ($_22 < $_25()) {
        $_26($_25() - $_24 * $_23);
        if ($_22 > $_25()) {
            $_26($_22);
        }
    }
};
export const animation_walk = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    let $_35 = Math.PI / 4;
    let $_36 = 4;
    let $_37 = Math.PI / 4 * -1;
    let $_38 = 4;
    let $_39 = Math.PI / 4;
    let $_40 = 4;
    let $_41 = Math.PI / 4 * -1;
    let $_42 = 4;
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        $_31.position.y = wave($_43) * 0.1;
        target_move($_35, $_36, $_24, () => $_27.rotation.x, ($_44) => $_27.rotation.x = $_44);
        target_move($_37, $_38, $_24, () => $_28.rotation.x, ($_44) => $_28.rotation.x = $_44);
        target_move($_39, $_40, $_24, () => $_29.rotation.x, ($_44) => $_29.rotation.x = $_44);
        target_move($_41, $_42, $_24, () => $_30.rotation.x, ($_44) => $_30.rotation.x = $_44);
        if ($_35 === $_27.rotation.x) {
            $_35 = -$_35;
        }
        if ($_37 === $_28.rotation.x) {
            $_37 = -$_37;
        }
        if ($_39 === $_29.rotation.x) {
            $_39 = -$_39;
        }
        if ($_41 === $_30.rotation.x) {
            $_41 = -$_41;
        }
    };
};
export const animation_run = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => ($_45) => {
    let $_35 = Math.PI / 2;
    let $_36 = 10;
    let $_37 = Math.PI / 2 * -1;
    let $_38 = 10;
    let $_39 = Math.PI / 2;
    let $_40 = 10;
    let $_41 = Math.PI / 2 * -1;
    let $_42 = 10;
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        $_31.position.y = -0.1 + wave($_43 * 4) * 0.1;
        $_31.rotation.x = Math.PI / 12 * ($_45 ? -1 : 1);
        target_move($_35, $_36, $_24, () => $_27.rotation.x, ($_44) => $_27.rotation.x = $_44);
        target_move($_37, $_38, $_24, () => $_28.rotation.x, ($_44) => $_28.rotation.x = $_44);
        target_move($_39, $_40, $_24, () => $_29.rotation.x, ($_44) => $_29.rotation.x = $_44);
        target_move($_41, $_42, $_24, () => $_30.rotation.x, ($_44) => $_30.rotation.x = $_44);
        if ($_35 === $_27.rotation.x) {
            $_35 = -$_35;
        }
        if ($_37 === $_28.rotation.x) {
            $_37 = -$_37;
        }
        if ($_39 === $_29.rotation.x) {
            $_39 = -$_39;
        }
        if ($_41 === $_30.rotation.x) {
            $_41 = -$_41;
        }
    };
};
export const animation_stop = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    return ($_24) => {
        return 0;
    };
};
export const animation_guard = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        $_31.position.y = -0.1 + wave($_43) * 0.1;
        $_27.rotation.x = -Math.PI / 4;
        $_28.rotation.x = Math.PI / 4;
        $_29.rotation.x = -Math.PI / 4;
        $_30.rotation.x = Math.PI / 4;
        $_27.position.y = wave($_43) * 0.1;
        return $_28.position.y = wave($_43 + 0.5) * 0.1;
    };
};
export const animation_jump = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        $_27.rotation.x = -Math.PI / 4;
        $_28.rotation.x = Math.PI / 4;
        $_29.rotation.x = -Math.PI / 4;
        $_30.rotation.x = Math.PI / 4;
        $_27.position.y = wave($_43) * 0.1;
        return $_28.position.y = wave($_43 + 0.5) * 0.1;
    };
};
export const animation_action = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        $_31.position.y = -0.1 + wave($_43) * 0.1;
        $_27.position.y = wave($_43) * 0.1;
        $_28.position.y = wave($_43 + 0.5) * 0.1;
        $_27.rotation.x = -Math.PI / 2;
        $_28.rotation.x = Math.PI / 8;
        $_29.rotation.x = Math.PI / 8;
        $_30.rotation.x = -Math.PI / 8;
        return $_27.position.z = wave($_43 * 2) * 0.2;
    };
};
export const animation_hi = ($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34) => () => {
    let $_43 = 0;
    return ($_24) => {
        $_43 += $_24;
        return $_28.rotation.z = wave($_43 + 0.5) * -1 + Math.PI;
    };
};
export const rescale = ($_46, $_47, $_48, $_49, $_50) => {
    let $_51 = $_48 - $_47;
    let $_52 = $_50 - $_49;
    return ($_46 - $_47) * $_52 / $_51 + $_49;
};
export const capsule = ($_53) => {
    let $_54 = 0;
    for (let $_55 = 0; $_55 < $_53.attributes.position.array.length; $_55 += 3) {
        let $_46 = $_53.attributes.position.array[$_55 + 0];
        let $_56 = $_53.attributes.position.array[$_55 + 1];
        let $_57 = $_53.attributes.position.array[$_55 + 2];
        if ($_46 < 0.05 && $_46 > -0.05 && $_57 < 0) {
            $_53.attributes.position.array[$_55 + 0] = 0;
        }
        let $_58 = new three.Spherical();
        $_58.setFromCartesianCoords($_46, $_56, $_57);
        $_58.makeSafe();
        let $_59 = rescale($_58.theta, (-Math.PI), Math.PI, 0, 1);
        let $_60 = rescale($_58.phi, 0, Math.PI, 1, 0);
        $_53.attributes.uv.array[$_54 + 0] = $_59;
        $_53.attributes.uv.array[$_54 + 1] = $_60;
        $_54 += 2;
    }
    return $_53;
};
export const texture = ($_61) => {
    let $_20 = new three.TextureLoader().load($_61);
    $_20.colorSpace = three.SRGBColorSpace;
    $_20.generateMipmaps = false;
    $_20.wrapS = three.RepeatWrapping;
    $_20.wrapT = three.RepeatWrapping;
    return $_20;
};
export const material = ($_63) => {
    let $_20 = new three.TextureLoader().load('three_tone.jpg');
    $_20.minFilter = three.NearestFilter;
    $_20.magFilter = three.NearestFilter;
    let $_64 = new three.MeshToonMaterial({ gradientMap: $_20, map: $_63 });
    return $_64;
};
export const droid = ($_65) => {
    let $_66 = texture($_65 + '_body.png');
    let $_67 = texture($_65 + '_arms.png');
    let $_68 = texture($_65 + '_legs.png');
    let $_69 = capsule(new three.CapsuleGeometry(1, 1, 20, 200));
    let $_70 = material($_66);
    let $_31 = new three.Mesh($_69, $_70);
    let $_71 = capsule(new three.CapsuleGeometry(0.5, 0.5, 20, 200));
    let $_72 = material($_67);
    let $_28 = new three.Mesh($_71, $_72);
    let $_32 = 1;
    let $_33 = 0.5;
    let $_34 = 1 * -1;
    let $_27 = new three.Mesh($_71, $_72);
    let $_73 = capsule(new three.CapsuleGeometry(0.5, 0.5, 20, 200));
    let $_74 = material($_68);
    let $_30 = new three.Mesh($_73, $_74);
    let $_29 = new three.Mesh($_73, $_74);
    let $_75 = new three.Object3D();
    $_75.add($_31);
    $_75.add($_28);
    $_75.add($_27);
    $_75.add($_30);
    $_75.add($_29);
    let $_76 = new three.Object3D();
    $_75.position.y = 0.25;
    $_76.add($_75);
    $_75 = $_76;
    $_75.scale.set(0.65, 0.65, 0.65);
    let $_77 = () => {
        $_31.position.set(0, 0, 0);
        $_31.rotation.set(0, 0, 0);
        $_28.position.set(0, 0, 0);
        $_28.rotation.set(0, 0, 0);
        $_27.position.set(0, 0, 0);
        $_27.rotation.set(0, 0, 0);
        $_30.position.set(0, 0, 0);
        $_30.rotation.set(0, 0, 0);
        $_29.position.set(0, 0, 0);
        $_29.rotation.set(0, 0, 0);
        $_28.position.x = $_32;
        $_27.position.x = -$_28.position.x;
        $_30.position.y = $_34;
        $_30.position.x = -$_33;
        $_29.position.y = $_30.position.y;
        return $_29.position.x = -$_30.position.x;
    };
    $_77();
    let $_78 = animation_walk($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_79 = animation_stop($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_80 = animation_run($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_81 = animation_guard($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_82 = animation_jump($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_83 = animation_action($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_84 = animation_hi($_27, $_28, $_29, $_30, $_31, $_32, $_33, $_34);
    let $_85 = $_79();
    let $_86 = 'stop';
    return Droid.struct({ anim_get: () => $_86, anim_set: ($_51) => {
            $_77();
            $_86 = $_51;
            if ($_51 === 'walk') {
                $_85 = $_78();
            }
            if ($_51 === 'stop') {
                $_85 = $_79();
            }
            if ($_51 === 'run') {
                $_85 = $_80(false);
            }
            if ($_51 === 'dash') {
                $_85 = $_80(true);
            }
            if ($_51 === 'guard') {
                $_85 = $_81();
            }
            if ($_51 === 'jump') {
                $_85 = $_82();
            }
            if ($_51 === 'action') {
                $_85 = $_83();
            }
            if ($_51 === 'hi') {
                $_85 = $_84();
            }
        }, mesh: $_75, update: ($_24) => {
            return $_85($_24);
        } });
};
