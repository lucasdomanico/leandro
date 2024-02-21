export const angle_slider = ($_4) => {
    let $_5 = document.createElement('input');
    $_5.type = 'range';
    $_5.style.position = 'absolute';
    $_5.style.top = '2%';
    $_5.style.appearance = 'none';
    $_5.style.background = '#A0A0A0';
    $_5.style.borderRadius = '30px';
    $_5.style.left = '35%';
    $_5.style.right = '35%';
    $_5.style.width = '30%';
    $_5.style.opacity = 0.75;
    $_5.min = -1;
    $_5.max = 1;
    $_5.step = 0.001;
    $_5.onchange = ($_7) => {
        return $_5.value = 0;
    };
    $_5.value = 0;
    setInterval(() => {
        return $_4('angle', $_5.value);
    }, 1000 / 60);
    return document.body.appendChild($_5);
};
export const zoom_slider = ($_4) => {
    let $_9 = document.createElement('div');
    $_9.style.position = 'absolute';
    $_9.style.top = '25%';
    $_9.style.bottom = '25%';
    $_9.style.left = '2%';
    $_9.style.right = '96%';
    $_9.style.borderRadius = '30px';
    document.body.appendChild($_9);
    let $_5 = document.createElement('input');
    $_5.type = 'range';
    $_5.style.position = 'absolute';
    $_5.style.appearance = 'none';
    $_5.style.background = '#A0A0A0';
    $_5.style.borderRadius = '30px';
    $_5.style.transform = 'rotate(270deg)';
    $_5.style.top = '40%';
    $_5.style.width = '200px';
    $_5.style.marginLeft = '-50px';
    $_5.style.opacity = 0.75;
    $_5.min = -1;
    $_5.max = 1;
    $_5.step = 0.001;
    $_5.value = 0;
    setInterval(() => {
        return $_4('zoom', $_5.value);
    }, 1000 / 60);
    return $_9.appendChild($_5);
};
export const brick = ($_10, $_11, $_4) => {
    let $_9 = document.createElement('button');
    $_9.style.position = 'absolute';
    $_9.style.top = (2 + $_10 * 12) + '%';
    $_9.style.right = '2%';
    $_9.style.width = '5%';
    $_9.style.height = '10%';
    $_9.style.border = '2px solid black';
    $_9.style.background = $_11;
    $_9.style.borderRadius = '30px';
    $_9.onclick = () => {
        return $_4('brick', $_10);
    };
    return document.body.appendChild($_9);
};
export const ui_start = ($_4) => {
    angle_slider($_4);
    zoom_slider($_4);
    brick(0, 'red', $_4);
    brick(1, '#fcc203', $_4);
    brick(2, '#fcf003', $_4);
    brick(3, '#a5fc03', $_4);
    brick(4, '#03dffc', $_4);
    return brick(5, 'white', $_4);
};
