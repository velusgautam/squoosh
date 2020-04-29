use wasm_bindgen::prelude::*;

mod malloc_shim;

#[cfg(feature = "parallel")]
pub mod parallel;

#[wasm_bindgen]
pub fn optimise(data: &[u8], level: u8) -> Vec<u8> {
    let mut options = oxipng::Options::from_preset(level);
    options.deflate = oxipng::Deflaters::Libdeflater;
    oxipng::optimize_from_memory(data, &options).unwrap_throw()
}
