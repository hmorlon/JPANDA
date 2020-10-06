using Documenter, PANDA

makedocs(;
    modules=[PANDA],
    format=Documenter.HTML(),
    pages=[
        "Home" => "index.md",
        "ClaDS" => Any["Tutorial" => "clads/tutorial.md",
            "Simulation" => "clads/sim_clads.md",
            "Inferrence" => "clads/infer_clads.md"]
    ],
    repo="https://github.com/hmorlon/PANDA.jl/blob/{commit}{path}#L{line}",
    sitename="PANDA.jl",
    authors="Helene Morlon, Ignacio Quintero, Odile Maliet",
    assets=String[],
)

deploydocs(;
    repo="github.com/hmorlon/PANDA.jl",
)
