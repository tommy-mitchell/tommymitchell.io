# rebuilds bundle on site regeneration
Jekyll::Hooks.register :clean, :on_obsolete do
    cmd = "yarn rollup"
    # https://stackoverflow.com/a/2400/10292952
    `#{cmd}`
end