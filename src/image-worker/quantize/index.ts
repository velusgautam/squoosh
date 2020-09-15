/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import imagequant, { QuantizerModule } from 'codecs/imagequant/imagequant';
import wasmUrl from 'url:codecs/imagequant/imagequant.wasm';
import { initEmscriptenModule } from '../util';

export interface QuantizeOptions {
  zx: number;
  maxNumColors: number;
  dither: number;
}

export const defaultOptions: QuantizeOptions = {
  zx: 0,
  maxNumColors: 256,
  dither: 1.0,
};

let emscriptenModule: Promise<QuantizerModule>;

export default async function process(
  data: ImageData,
  opts: QuantizeOptions,
): Promise<ImageData> {
  if (!emscriptenModule) {
    emscriptenModule = initEmscriptenModule(imagequant, wasmUrl);
  }

  const module = await emscriptenModule;

  const result = opts.zx
    ? module.zx_quantize(data.data, data.width, data.height, opts.dither)
    : module.quantize(
        data.data,
        data.width,
        data.height,
        opts.maxNumColors,
        opts.dither,
      );

  return new ImageData(result, data.width, data.height);
}
