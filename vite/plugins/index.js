import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import.js'
import createSvgIcon from './svg-icon.js'
import createCompression from './compression.js'
import createSetupExtend from './setup-extend.js'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
	vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSvgIcon(isBuild))
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
