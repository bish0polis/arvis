export default {
  global_config: {
    global_font: 'Arial',
    launch_at_login: false,
    max_item_count_to_search: 100,
    max_item_count_to_show: 9,
    toggle_search_window_hotkey:
      process.platform === 'darwin' ? 'Cmd + Space' : 'Ctrl + Space',
  },
  ui_config: {
    icon_right_margin: 10,
    item_background_color: '#272727',
    item_default_icon_color: '#FFFFFF',
    item_font_color: '#C9C9C9',
    item_height: 67,
    item_left_padding: 15,
    item_title_subtitle_margin: 3,
    searchbar_automatch_font_color: '#888',
    searchbar_dragger_color: '#FFFFFF',
    searchbar_font_color: '#FFFFFF',
    searchbar_font_size: 20,
    searchbar_height: 60,
    search_window_border_radius: 6,
    search_window_footer_height: 10,
    search_window_scrollbar_color: '#FFFFFF',
    search_window_scrollbar_width: 2,
    search_window_transparency: 240,
    search_window_width: 900,
    selected_item_background_color: '#111113',
    selected_item_font_color: '#FFFFFF',
    subtitle_font_size: 10,
    title_font_size: 17,
  },
  advanced_config: {
    async_plugin_timer: 200,
    debugging_action: true,
    debugging_plugin: true,
    debugging_script: true,
    debugging_scriptfilter: true,
    debugging_trigger_stack: true,
    max_action_log_count: 1500,
  },
  clipboard_history: {
    apply_mouse_hover_event: true,
    hotkey: process.platform === 'darwin' ? 'Meta + Alt + C' : 'Ctrl + Alt + C',
    max_show: 50,
    max_size: 400,
    store: [],
  },
};
