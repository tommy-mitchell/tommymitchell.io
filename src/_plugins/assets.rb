# https://stackoverflow.com/a/25802615/10292952

module IncludeAssets
    class Generator < Jekyll::Generator
        def generate(site)
            # includes all files in assets/

            # get directories in assets
            Dir.chdir("#{site.source}/../assets") do
                # get each file name
                Dir.glob("**/*.*").each do |path|
                    # create static file relative to the src folder
                    site.static_files << Jekyll::StaticFile.new(site, site.source, "../", "assets/#{path}")
                end
            end
        end
    end
end