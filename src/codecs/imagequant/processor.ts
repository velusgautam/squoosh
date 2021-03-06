import imagequant, { QuantizerModule } from '../../../codecs/imagequant/imagequant';
import wasmUrl from '../../../codecs/imagequant/imagequant.wasm';
import { QuantizeOptions } from './processor-meta';
import { initEmscriptenModule } from '../util';

let emscriptenModule: Promise<QuantizerModule>;

export async function process(data: ImageData, opts: QuantizeOptions): Promise<ImageData> {
  if (!emscriptenModule) emscriptenModule = initEmscriptenModule(imagequant, wasmUrl);

  const module = await emscriptenModule;

  const result = opts.zx ?
      module.zx_quantize(data.data, data.width, data.height, opts.dither)
    :
      module.quantize(data.data, data.width, data.height, opts.maxNumColors, opts.dither);

  return new ImageData(result, data.width, data.height);
}
