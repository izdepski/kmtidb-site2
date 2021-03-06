class SlideCounter {
	constructor() {
		this.homeSection = document.querySelector('#section0');
		this.slides = document.querySelectorAll('.slide');
		
		this.render();
	}
	
	render() {
		this.initCounter();
	}
	
  initCounter() {
	this.slideCounter = document.createElement("div");
	this.slideCounter.id = "slidecounter";
	this.slideCounter.className = "slidecounter";

	this.slideIdx = document.createElement("span");
	this.slideIdx.id = "slideidx";
	this.slideIdx.innerText = "1";
	
	const slideIdxSep = document.createElement("span");
	slideIdxSep.innerText = " / ";
	
	const slideLen = document.createElement("span");
	slideLen.id = "slidelen";
	slideLen.innerText = this.slides.length;
		
	this.slideCounter.appendChild(this.slideIdx);
	this.slideCounter.appendChild(slideIdxSep);
	this.slideCounter.appendChild(slideLen);
	this.homeSection.appendChild(this.slideCounter);
		
	this.observeSlides(this.homeSection);
  }
	
	observeSlides(t) {
		const _this = this;
		
		// Select the node that will be observed for mutations
		var targetNode = t;

		// Options for the observer (which mutations to observe)
		var config = { subtree: true, attributes: true };

		// Callback function to execute when mutations are observed
		var callback = function(mutationsList) {
		    for(var mutation of mutationsList) {
		        if (mutation.type == 'attributes') {
							var targetSlide = mutation.target;
							var classAttr = targetSlide.className;
							if (classAttr.indexOf("active") !== -1) {
								var mutParent = targetSlide.parentNode;
								var mutIdx = Array.prototype.indexOf.call(mutParent.children, targetSlide);
								
								_this.slideIdx.innerText = mutIdx + 1;
							}
		        }
		    }
		};

		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(callback);

		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);
	}
	
}

const slideCounter = new SlideCounter();
