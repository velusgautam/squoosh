mod malloc_shim;

use js_sys::Array;
use rayon::ThreadBuilder;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsCast, JsValue};

#[wasm_bindgen]
extern "C" {
    type Worker;

    #[wasm_bindgen(method, js_name = postMessage)]
    fn post_message(worker: &Worker, msg: JsValue);
}

#[wasm_bindgen]
pub fn start_main_thread(workers: Array) {
    // console_log::init_with_level(log::Level::Trace);

    rayon::ThreadPoolBuilder::new()
        .num_threads(workers.length() as _)
        .spawn_handler(move |thread| {
            Ok(workers.pop().unchecked_into::<Worker>().post_message({
                let arr = Array::new();
                arr.push(&wasm_bindgen::module());
                arr.push(&wasm_bindgen::memory());
                arr.push(&JsValue::from(Box::into_raw(Box::new(thread)) as u32));
                arr.into()
            }))
        })
        .build_global()
        .unwrap_throw()
}

#[wasm_bindgen]
pub fn start_worker_thread(thread: *mut rayon::ThreadBuilder) {
  // console_log::init_with_level(log::Level::Trace);

  unsafe { Box::from_raw(thread) }.run()
}

#[wasm_bindgen(catch)]
pub fn optimise(data: &[u8], level: u8) -> Vec<u8> {
    let mut options = oxipng::Options::from_preset(level);
    options.deflate = oxipng::Deflaters::Libdeflater;
    oxipng::optimize_from_memory(data, &options).unwrap_throw()
}
