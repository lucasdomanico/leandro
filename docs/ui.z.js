export const angle_slider = ($_5) => {
    let $_6 = document.createElement('input');
    $_6.type = 'range';
    $_6.style.position = 'absolute';
    $_6.style.top = '2%';
    $_6.style.appearance = 'none';
    $_6.style.background = '#A0A0A0';
    $_6.style.borderRadius = '30px';
    $_6.style.left = '35%';
    $_6.style.right = '35%';
    $_6.style.width = '30%';
    $_6.style.height = '5%';
    $_6.style.opacity = 0.75;
    $_6.min = -1;
    $_6.max = 1;
    $_6.step = 0.001;
    $_6.onchange = ($_8) => {
        return $_6.value = 0;
    };
    $_6.value = 0;
    setInterval(() => {
        return $_5('angle', $_6.value);
    }, 1000 / 60);
    return document.body.appendChild($_6);
};
export const zoom_slider = ($_5) => {
    let $_10 = document.createElement('div');
    $_10.style.position = 'absolute';
    $_10.style.top = '25%';
    $_10.style.bottom = '25%';
    $_10.style.left = '2%';
    $_10.style.right = '96%';
    $_10.style.borderRadius = '30px';
    document.body.appendChild($_10);
    let $_6 = document.createElement('input');
    $_6.type = 'range';
    $_6.style.position = 'absolute';
    $_6.style.appearance = 'none';
    $_6.style.background = '#A0A0A0';
    $_6.style.borderRadius = '30px';
    $_6.style.transform = 'rotate(270deg)';
    $_6.style.top = '40%';
    $_6.style.width = '200px';
    $_6.style.marginLeft = '-50px';
    $_6.style.opacity = 0.75;
    $_6.min = -1;
    $_6.max = 1;
    $_6.step = 0.001;
    $_6.value = 0;
    setInterval(() => {
        return $_5('zoom', $_6.value);
    }, 1000 / 60);
    return $_10.appendChild($_6);
};
export const brick = ($_11, $_12, $_5) => {
    let $_10 = document.createElement('button');
    $_10.style.position = 'absolute';
    $_10.style.top = (2 + $_11 * 12) + '%';
    $_10.style.right = '2%';
    $_10.style.width = '5%';
    $_10.style.height = '10%';
    $_10.style.border = '2px solid black';
    $_10.style.background = $_12;
    $_10.style.borderRadius = '30px';
    $_10.onclick = () => {
        return $_5('brick', $_11);
    };
    return document.body.appendChild($_10);
};
export let rainbow = `
    linear-gradient(in hsl longer hue 45deg, red 0 0)
`;
export const ui_start = ($_5) => {
    angle_slider($_5);
    zoom_slider($_5);
    brick(0, 'red', $_5);
    brick(1, '#fcc203', $_5);
    brick(2, '#fcf003', $_5);
    brick(3, '#a5fc03', $_5);
    brick(4, '#03dffc', $_5);
    brick(5, rainbow, $_5);
    return brick(6, 'white', $_5);
};
