#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{listen, Event, EventType, Keyboard, KeyboardState};
use tauri::{
  image::Image,
  tray::TrayIconBuilder,
  Manager
};

#[derive(Clone, serde::Serialize)]
struct KeyboardRawPayload {
  content: String,
  from_enum: String
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let main_window = app.get_webview_window("main").unwrap();
      let _ = main_window.set_ignore_cursor_events(true);

      let _ = TrayIconBuilder::new()
          .icon(Image::from_path("./icons/icon.png")?)
          .tooltip("Keycat")
          .build(app)?;

      let app = app.handle().clone();
      let mut keyboard = Keyboard::new();

      let callback = move |evt: Event| {
        match evt.event_type {
          EventType::KeyPress(k) => {
            match keyboard.add(&evt.event_type) {
              Some(unicode) => {
                if let Some(key) = unicode.name {
                  app.emit("press:raw", KeyboardRawPayload {
                    content: key,
                    from_enum: format!("{:?}", k)
                  }).unwrap();
                }
                else {
                  // Most of the time, reaching here
                  // means pressing a dead/compose key.
                }
              },
              None => {
                app.emit("press:enum", format!("{:?}", k)).unwrap();
              }
            }
          }
          EventType::KeyRelease(k) => {
            keyboard.add(&evt.event_type);
            app.emit("release:enum", format!("{:?}", k)).unwrap();
          }
          _ => (),
        }
      };

      tauri::async_runtime::spawn(async move {
        if let Err(error) = listen(callback) {
            println!("Error: {:?}", error)
        }
      });
      
      Ok(())
    })
    .plugin(tauri_plugin_shell::init())
    .run(tauri::generate_context!())
    .expect("Error while running keycat, please open an issue on the repository.");
}
