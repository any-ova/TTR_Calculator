#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let port = 1420;

    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_cors_fetch::init())
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}