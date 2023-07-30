const extension = imports.misc.extensionUtils.getCurrentExtension();

function get_primary_display() {
    return global.display.get_primary_monitor();
}

function get_workspace() {
    return global.workspace_manager.get_active_workspace();
}

function get_all_windows() {
    return global.display.list_all_windows();
}

function get_focused_window() {
    let windows = get_all_windows();
    for(let window of windows) {
        if(window.has_focus())
            return window;
    }
}

function get_all_workspace_windows() {
    return get_workspace().list_windows();
}

function move_window(window, ignore_top_bar, x, y, w, h) {
    window.move_resize_frame(ignore_top_bar, x, y, w, h);
}

function configure_window(window) {
    
}

function win_to_new_workspace(window, switch_to_new) {
    let workspace = global.workspace_manager.append_new_workspace(false, 0); // Create new workspace
    let active_workspace = get_workspace();
    global.workspace_manager.reorder_workspace(workspace, active_workspace.index() + 1) // Move the new workspace to the right of the current workspace
    window.change_workspace(workspace); // Move window to new workspace
    let offset = global.display.get_monitor_geometry(window.get_monitor()); // Get top bar offset (if applicable)
    let frame = window.get_frame_rect();
    move_window(window, false, 0, offset, frame.width, frame.height - offset);
    if(switch_to_new) workspace.activate(0);
    return workspace; // Return new workspace
}

function move_back_window(window) {
    let workspace = window.get_workspace();
    let previous_workspace = workspace.get_neighbor(-3);
    if(!previous_workspace) {
        console.error("There is no workspace to the left.");
        return;
    }
    window.change_workspace(previous_workspace); // Move window to previous workspace
    previous_workspace.activate(0); // Switch to it
    global.workspace_manager.remove_workspace(workspace, 0); // Clean old workspace
    return previous_workspace;
}