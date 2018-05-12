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
		this.slideCounter.style.cssText = "\
			position: absolute; \
			bottom: 12%; \
			right: 50px; \
			font-size: 15px; \
			color: #FFFFFF; \
			font-weight: bold";
		
		this.slideIdx = document.createElement("span");
		this.slideIdx.id = "slideidx";
		this.slideIdx.innerText = "1";
		const slideSep = document.createElement("span");
		slideSep.innerText = " / ";
		const slideLen = document.createElement("span");
		slideLen.id = "slidelen";
		slideLen.innerText = this.slides.length;
		
		this.slideCounter.appendChild(this.slideIdx);
		this.slideCounter.appendChild(slideSep);
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
