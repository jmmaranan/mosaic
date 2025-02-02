const st = imports.gi.St;
const main = imports.ui.main;

var boxes = [];

function rect(x, y, width, height) {
    const box = new st.BoxLayout({ style_class: "feedforward" });
    box.x = x;
    box.y = y;
    box.width = width;
    box.height = height;
    boxes.push(box);
    main.uiGroup.add_actor(box);
}

function remove_boxes() {
    for(let box of boxes)
        main.uiGroup.remove_actor(box);
    boxes = [];
}

function clear_actors() {
    remove_boxes();
}