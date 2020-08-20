import { EncodeOptions } from 'worker-main-shared/mozjpegEncode';

interface MozJPEGModule extends EmscriptenWasm.Module {
  encode(
    data: BufferSource,
    width: number,
    height: number,
    options: EncodeOptions,
  ): Uint8Array;
}

export default function (opts: EmscriptenWasm.ModuleOpts): MozJPEGModule;
