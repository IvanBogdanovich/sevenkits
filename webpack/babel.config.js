module.exports = (api) => {
    api.cache(true)
    const presets = ['@babel/preset-env', '@babel/preset-react']
    const plugins = [
        '@babel/plugin-syntax-jsx',
    ]
    return {
        presets,
        plugins
    }
}