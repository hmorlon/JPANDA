var documenterSearchIndex = {"docs":
[{"location":"clads/tutorial/#ClaDS-manual","page":"Manual","title":"ClaDS manual","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The ClaDS module implements the Data Augmentation inference method for the ClaDS model, that allows estimating branch specific speciation rates on a reconstructed phylogeny.","category":"page"},{"location":"clads/tutorial/#Loading-a-tree","page":"Manual","title":"Loading a tree","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"You can import a phylogeny to the environment using the load_tree function. Currently supported extensions include .tre and .nex.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"my_tree = load_tree(tree_path)","category":"page"},{"location":"clads/tutorial/#Running-ClaDS","page":"Manual","title":"Running ClaDS","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The parameter inference is ran with the function infer_ClaDS","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"output = infer_ClaDS(my_tree)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The keyword argument print_state can be used to print the state of the run every print_state iteration.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"output = infer_ClaDS(my_tree, print_state = 100)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"You can save the result with","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"using JLD2\n@save the_path_you_want_to_save_the_result output","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"and load it back to a julia session with","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"using JLD2\n@load the_path_you_want_to_save_the_result output","category":"page"},{"location":"clads/tutorial/#Incomplete-sampling","page":"Manual","title":"Incomplete sampling","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"By default, the function considers that the clade was perfectly sampled, i.e. that all the species alive at present time are included in the phylogeny. If it is not the case, the sampling fraction can be specified through the keyword argument f. f can be a Float, in which case the sampling fraction is taken as homogeneous on the whole phylogeny.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"output = infer_ClaDS(my_tree, f = 0.94)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Alternatively, different sampling fractions can be specified for different subclades. To do so, f should be passed as a Array{Float64} of length n, where n is the number of tip in the phylogeny. f[i] is the sampling fraction of the subclade that contains tip i. If the Tree object has tip labels (which can be accessed using tip_labels(my_tree), the sampling fractions in f are in the same order as the tip labels, and f[i] is the sampling fraction of the subclade that contains the tip with label tip_labels(my_tree)[i].","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"In the following example, the left subtree of my_tree is assigned the sampling fraction 0.3 and its right subtree the sampling fraction 0.8.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"#=\n create a vector of size n_tips(my_tree) where the first\n n_tips(my_tree.offsprings[1]) elements are equal to 0.3\n and the rest to 0.8\n=#\nf = [ i < n_tips(my_tree.offsprings[1]) ? 0.3 : 0.8 for i in 1:n_tips(my_tree)]\noutput = infer_ClaDS(my_tree, f = f)","category":"page"},{"location":"clads/tutorial/#Result","page":"Manual","title":"Result","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The result is a CladsOutput object, that contains the following fields:","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"tree: the Tree object on which the inference was performed.\nchains: the resulting mcmc chains.\nrtt_chains: the mcmc chains of  the mean rate through time.\nσ_map, α_map, ε_map, λ0_map: the MAP estimates of the model's parameters.\nλi_map, λtip_map: the MAP estimates of the branch-specific and present rates.\ntime_points: Time points at which the number of lineages through time and rate through time are computed. The number of time points can be specified using the keyword argument ltt_steps.\nDTT_mean: Estimate of the number of lineages through time.\nRTT_map: Estimate of the mean rate through time.\nenhanced_tree: Sample from the complete phylogeny distribution. Their number can be specified through the keyword argument n_trees.\ngelm: Evaluation of the gelman statistics.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"If the tree has tip labels, the tip rate for species sp_name can be extracted using the function tip_rate:","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"tip_rate(output, sp_name)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The result can be saved as a .Rdata object with the function save_ClaDS_in_R, so it can be manipulated in R.","category":"page"},{"location":"clads/tutorial/#Plot-the-branch-specific-rates","page":"Manual","title":"Plot the branch specific rates","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"It can be plotted using the plot_CladsOutput function. By default, this function plots the reconstructed phylogeny painted with the inferred branch-specific speciation rates, but other methods are available.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Options for plotting the tree can be passed as a String to the options keyword argument. All the options of the R function plot.phylo from the ape package are available.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, options = \"type = 'fan'\")\nplot_CladsOutput(output, options = \"lwd = 1, direction = 'leftwards'\")","category":"page"},{"location":"clads/tutorial/#Diversity-through-time-plot","page":"Manual","title":"Diversity through time plot","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Using the keyword argument method = \"DTT\", the function plots the estimate of the number of lineages through time.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"DTT\")","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"On this plot, we have:","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"black line: the LTT plot (number of lineages through time in the reconstructed phylogeny)\nthin blue lines: individual MCMC iterations\nthick blue lines: the 95 confidence interval\ndotted green line: the point estimates","category":"page"},{"location":"clads/tutorial/#Mean-rate-through-time-plot","page":"Manual","title":"Mean rate through time plot","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Using the keyword argument method = \"RTT\", the function plots the estimate of the mean speciation rate through time.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"RTT\")","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Similarly to the diversity through time plot, we have here:","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"thin blue lines: individual MCMC iterations\nthick blue lines: the 95 confidence interval\ndotted green line: the point estimates","category":"page"},{"location":"clads/tutorial/#Marginal-posterior-densities","page":"Manual","title":"Marginal posterior densities","text":"","category":"section"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"With the keyword argument method = \"density\", the functions plot the marginal posterior density of a given model parameter or a summary statistics. Similarly, method = \"chain\" allows plotting the mcmc chains for this parameter.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"density\")\nplot_CladsOutput(output, method = \"chain\")","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"What parameter to plot is specified through the keyword id_par, for both  method = \"density\" and  method = \"chain\".","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"density\", id_par = \"sigma\")\nplot_CladsOutput(output, method = \"density\", id_par = \"σ\")\n\nplot_CladsOutput(output, method = \"density\", id_par = \"alpha\")\nplot_CladsOutput(output, method = \"density\", id_par = \"epsilon\")\nplot_CladsOutput(output, method = \"density\", id_par = \"lambda0\")","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The branch specific speciation rate of branch i is accessed with  id_par = lambda_i or id_par = λ_i","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"density\", id_par = \"lambda_5\")\nplot_CladsOutput(output, method = \"density\", id_par = \"λ_2\")","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"The tip rate of tip i is accessed with  id_par = lambda_tip_i or id_par = λtip_i. Alternatively, if the tree has tip labels, the rate can be accessed using the species name with id_par = lambda_tip_spname.","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"density\", id_par = \"lambdatip_2\")\nplot_CladsOutput(output, method = \"density\", id_par = \"λtip_3\")\n\nsp_name = tip_labels(my_tree)[10]\nid_par = \"λtip_$(sp_name)\"\nplot_CladsOutput(output, method = \"density\", id_par = id_par)","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"Finaly, the rate through time and diversity through time can be accessed with id_par = rate_time and id_par = div_time, where time is an integer between 1and length(output.time_points).","category":"page"},{"location":"clads/tutorial/","page":"Manual","title":"Manual","text":"plot_CladsOutput(output, method = \"density\", id_par = \"rate_12\")\nplot_CladsOutput(output, method = \"density\", id_par = \"div_33\")","category":"page"},{"location":"#PANDA.jl-Phylogenetic-ANalyses-of-DiversificAtion","page":"Home","title":"PANDA.jl    Phylogenetic ANalyses of DiversificAtion","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = PANDA\nusing PANDA","category":"page"},{"location":"","page":"Home","title":"Home","text":"Implements macroevolutionary analyses on phylogenetic trees.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You can install the package by typing","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using Pkg\njulia> Pkg.add(\"PANDA\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"PANDA uses R functions and packages for plotting. If you want to be able to use the plotting functions, the R language needs to be installed on your computer. You will also need a few R packages to be installed, including : ape, coda, RColorBrewer, fields. You can install them from a R session by typing","category":"page"},{"location":"","page":"Home","title":"Home","text":"> install.packages(\"ape\", \"coda\", \"RColorBrewer\", \"fields\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"You will then be able to load PANDA to Julia by typing","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using PANDA","category":"page"},{"location":"#ClaDS","page":"Home","title":"ClaDS","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The ClaDS module implements the inference of ClaDS parameters on a phylogeny using data augmentation. A step by step presentation of how to perform the inference is available in the manual","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [PANDA.ClaDS]\nPages   = [\"load_tree.jl\", \"infer_ClaDS2.jl\", \"clads_output.jl\", \"plot_ClaDS.jl\",\"tree_class.jl\", \"Tree_utils.jl\",\"clads_output.jl\",\"export_in_R.jl\"]","category":"page"},{"location":"#PANDA.ClaDS.load_tree-Tuple{String}","page":"Home","title":"PANDA.ClaDS.load_tree","text":"load_tree(file::String)\n\nLoads a tree from a file. Supported formats are '.nex' and '.tre'.\n\nArguments\n\nfile::String:path to the file.\n\n\n\n\n\n","category":"method"},{"location":"#PANDA.ClaDS.infer_ClaDS","page":"Home","title":"PANDA.ClaDS.infer_ClaDS","text":"infer_ClaDS(tree::Tree, n_reccord::Int64; ...)\n\nInfer ClaDS parameters on a tree\n\nArguments\n\ntree::Tree: the phylogeny on which to perform the inference.\nn_reccord::Int64: number of iterations between two computations of the gelman statistics. Default to 1_000.\n\nKeyword arguments\n\nformer_run::CladsOutput: the result of a run of infer_ClaDS on the tree. The new mcmc chains will be added to these ones.\nf::Float64: The sampling probability. It can be a Float (in which case the whole clade has the same sampling probability), or a vector length n_tips(tree)(in which case sampling probabilities are subclades specific andmust be given in the same order as the tip tip_labels(tree))Default to1.`.\ngoal_gelman::Float64: The gelman parameter value below which the run is stoped. Default to 1.05.\nend_it::Int64: Maximum number of MCMC iterations. If the number of iterations reaches this value, the run stop even if the gelman statistic is still above goal_gelamn. Default to Inf.\nthin::Int64: The thinning parameter. Default to 1..\nburn::Float64: The proportion of the mcmc that will be discarded befor computing the gelman statistics and point estiamtes for the parameters. Default to 0.25.\nn_trees::Int64: Number of samples from the posterior distribution of complete phylogenies to be outputed. Default to 10.\nltt_steps::Int64: Number of time points at which the rate through time and diversity through time should be computed. Default to 50.\nprint_state::Int64: If > 0, the state of the chains is printed every print_stateiteration. Default to 0.\nprior_ε::String : The prior to be used for ε. Default to \"uniform\", as used in the paper, but a \"lognormal\" prior can be defined as an alternative.\nlogε0::Float64: If prior_ε = \"lognormal\", mean of the ε prior on the log scale.\nsdε::Float64: If prior_ε = \"lognormal\", standard deviation of the ε prior on the log scale.\n\n\n\n\n\n","category":"function"},{"location":"#PANDA.ClaDS.plot_ClaDS-Tuple{Tree}","page":"Home","title":"PANDA.ClaDS.plot_ClaDS","text":"plot_ClaDS(tree::Tree ; ln=true, show_labels = false, options=\"\")\n\nPlots a tree with branches colored according to their rates\n\nArguments\n\ntree::Tree: the phylogeny to be plotted.\n\nKeyword arguments\n\nln::Bool: Should rates be plotted on a log scale? Default to true.\nshow_labels::Bool: Should tip labels be printed? Default to false.\noptions::String: Additonal options for the ploting function.\n\nplot_ClaDS(tree::Tree, rates::Array{Number,1} ; ln=true, show_labels = false, options=\"\")\n\nAdditional arguments\n\nrates::Array{Number,1}: the speciation rates.\n\n\n\n\n\n","category":"method"},{"location":"#PANDA.ClaDS.Tree","page":"Home","title":"PANDA.ClaDS.Tree","text":"A phylogeny object for the module ClaDS. It is represented as a branch with a given length and optional attributes, and its daughter trees.\n\noffsprings::Array{Tree,1}: the two daughter trees.\nbranch_length::Float64: the length of the branch\nattributes::Array{T,1} where {T<:Number}: soem attributes of the branch. Used to store the speciation rates.\nn_nodes::Int64: the number of nodes in the tree (internal nodes + tips)\nextant::Bool: does the tree have any extant species?\nlabel::String: if the tree is a tip (ie n_nodes == 1), contains the name of the corresponding species.\n\n\n\n\n\n","category":"type"},{"location":"#PANDA.ClaDS.n_tips-Tuple{Tree}","page":"Home","title":"PANDA.ClaDS.n_tips","text":"n_tips(tree::Tree)\n\nGet the number of tip in a tree.\n\nArguments\n\ntree::Tree: a Treeobject.\n\n\n\n\n\n","category":"method"},{"location":"#PANDA.ClaDS.tip_labels-Tuple{Tree}","page":"Home","title":"PANDA.ClaDS.tip_labels","text":"tip_labels(tree::Tree)\n\nExtract the tip labels of a tree.\n\nArguments\n\ntree::Tree: a Treeobject.\n\n\n\n\n\n","category":"method"},{"location":"#PANDA.ClaDS.CladsOutput","page":"Home","title":"PANDA.ClaDS.CladsOutput","text":"A structure containig the informations about the resulot of a ClaDS run. Contains the following fields :\n\ntree::Tree: the phylogeny on which the analysis was performed.\nchains::Array{Array{Array{Float64,1},1},1} : the mcmc chains\nrtt_chains::Array{Array{Array{Float64,1},1},1} : the mcmc chains with the rate through time\nσ_map::Float64 : the σ parameter estimate\nα_map::Float64 : the α parameter estimate\nε_map::Float64 : the ε parameter estimate\nλ0_map::Float64 : the initial speciation rate estimate\nλi_map::Array{Float64,1} : the estimates of the branh specific speciation rates\nλtip_map::Array{Float64,1} : the estimates of the tip speciation rates\nDTT_mean::Array{Float64,1} : the diversity through time estimates\nRTT_map::Array{Float64,1} : the rate through time estimates\ntime_points::Array{Float64,1} : the times at which DTT_mean and RTT_map are computed\nenhanced_trees::Array{Tree,1} : a sample of the complete tree distribution\ngelm::Tuple{Int64,Float64} : the gelman parameter\ncurrent_state : other variables, by infer_ClaDS used to continue the run\n\n\n\n\n\n","category":"type"},{"location":"#PANDA.ClaDS.plot_CladsOutput-Tuple{CladsOutput}","page":"Home","title":"PANDA.ClaDS.plot_CladsOutput","text":"plot_CladsOutput(co::CladsOutput ; method = \"tree\", ...)\n\nPlots various aspects of the output of ClaDS\n\nArguments\n\nco::CladsOutput : A CladsOutput object, the output of a ClaDS run.\n\nKeyword arguments\n\nmethod::String : A String indicating what aspect of the output should be plotted, see details.\n\n\n\n\n\n","category":"method"},{"location":"#PANDA.ClaDS.save_ClaDS_in_R-Tuple{CladsOutput,String}","page":"Home","title":"PANDA.ClaDS.save_ClaDS_in_R","text":"save_ClaDS_in_R(co::CladsOutput, path::String ; maxit = Inf, ...)\n\nSave the output of a ClaDS run as a Rdata file.\n\nArguments\n\nco::CladsOutput: the result of a run of infer_ClaDS.\npath::String: the path the file should be saved to.\n\n.Rdata file\n\nThe .Rdata file contains an object called CladsOutput that is a list with the following fields :\n\ntree: the phylogeny, saved as a phylo object\nchains: the MCMC chains\nrtt_chains: the MCMCs with the rate through time information\nsig_map: the MAP estimate for the σ parameter\nal_map: the MAP estimate for the α parameter\neps_map: the MAP estimate for the ε parameter\nlambda0_map: the MAP estimate for the λ0 parameter\nlambdai_map: the MAP estimate for the branch-specific speciation rates\nlambdatip_map: the MAP estimate for the tip speciation rates\nDTT_mean: the point estimate for the diversity through time\nRTT_map : the rate through time estimates\ntime_points : the times at which DTT_mean and RTT_map are computed\nenhanced_trees : a sample of the complete tree distribution, as a list of phylo objects\ngelm : the gelman parameter\n\n\n\n\n\n","category":"method"}]
}
