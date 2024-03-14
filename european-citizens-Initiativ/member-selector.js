// Autocomplete for member selector
// Documentation: https://www.europarldv.ep.parl.union.eu/commonFrontResources/evostrap/6.1.0/documentation/html_fr/#/forms/esAutocomplete
document.addEventListener("DOMContentLoaded", () => {
	let inputs = document.querySelectorAll('input.erpl-member-selector-input');
	if (inputs && inputs.length > 0) {
		inputs.forEach((baseDomElement) => {
			// init selector wrapper
			const selectorWrapper = new MemberSelectorWrapper(baseDomElement);

			// already has a value
			if (baseDomElement.value && !selectorWrapper.isProfileLinkSelectorMode()) {
				// fallback to value if dataset attr is missing
				const valueToDisplay = baseDomElement.dataset["selectedMemberName"] || baseDomElement.value;
				selectorWrapper.setSelectedMember(baseDomElement.value, valueToDisplay);
			} else {
				selectorWrapper.resetMemberSelection();
			}

			// autocomplete setup
			evostrap.load.esAutocomplete(true).then(EsAutocomplete => {
				new EsAutocomplete(baseDomElement, {
					delay: 500,
					minLength: 3,
					bodyWidth: 'inputWidth',
					source: (keyword) => {
						return new Promise((resolve, reject) => {
							$.getJSON(selectorWrapper.getMemberListSourceForText(keyword),
								data => {
									let res = data.map(entry => {
										return {
											...entry, ...{
												label: entry.name,
												value: selectorWrapper.shouldUseMemberNameAsValue()
													? entry.name
													: entry.identifier
											}
										}
									})
									resolve(res);
								}).fail(() => reject());
						});
					},
					optionTemplate: (option, i) => {
						return `<li 
							id="${baseDomElement.id + "Option" + i}" 
							data-option-index="${i}"
							class="es_autocomplete-option t-x-block" 
							aria-selected="false"
							role="option" 
							tabindex="-1">
							<a class="d-flex align-items-center"
							    ${selectorWrapper.isProfileLinkSelectorMode() ? `href="${option.profilePageUrl}"` : ''}>
								<span class="t-item d-flex align-items-center">
								    ${selectorWrapper.isSelectorItemsWithPhoto() ? `<img class="mr-1" loading="lazy" width="48" src="${option.photoUrl}" alt=""/>` : ''}
									<div>
										<div>${option.name}</div>
									</div>
								</span>
							</a>
							</li>`;
					},
				});
			});

			baseDomElement.addEventListener('select.es.autocomplete', (event) => {
				event.preventDefault();

				if (selectorWrapper.isProfileLinkSelectorMode()) {
					selectorWrapper.resetMemberSelection();
				} else {
					selectorWrapper.setSelectedMember(
						selectorWrapper.shouldUseMemberNameAsValue() ? event.detail.name : event.detail.identifier,
						event.detail.name);

					if (selectorWrapper.submitOnAutocompleteItemSelect()) {
						baseDomElement.closest('form').submit();
					}
				}
			});

			selectorWrapper.getSelectedMemberNameElement().addEventListener("click", () => {
				selectorWrapper.resetMemberSelection();
			});
		});
	}
});

class MemberSelectorWrapper {
	constructor(element) {
		this.baseInputElement = element;
		
		const baseElementId = this.baseInputElement.getAttribute("id");
		const selectedMemberNameElementId = `${baseElementId}_selected_member_name`;
		const selectButtonElementId = `${baseElementId}_selected_button`;
		const resetButtonElementId = `${baseElementId}_selected_member_name_delete`;

		// create tag/button component which will be displayed once a member is displayed
		this.baseInputElement.insertAdjacentHTML("afterend",
			`<div id="${selectButtonElementId}" class="btn form-control btn-light text-dark m-25 animated" style="display:none">
					  <i id="${resetButtonElementId}" class="erpl_icon erpl_icon-close-light animated mr-25"></i>
					  <span id="${selectedMemberNameElementId}"></span>
				  </div>`)

		this.selectedMemberElement = document.getElementById(selectButtonElementId);
		this.selectedMemberNameElement = document.getElementById(selectedMemberNameElementId);
	}
	
	getSelectedMemberNameElement() {
		return this.selectedMemberElement;
	}
	
	setSelectedMember(memberValue, memberName) {
		this.baseInputElement.value = memberValue;
		this.baseInputElement.style.display = 'none';
		this.selectedMemberElement.style.display = 'block';
		this.selectedMemberNameElement.innerText = memberName;
	}

	resetMemberSelection() {
		this.baseInputElement.value = null;
		this.baseInputElement.style.display = 'block';
		this.selectedMemberElement.style.display = 'none';
		this.selectedMemberNameElement.innerText = '';
	}
	
	getMemberListSourceForText(keyword) {
		const baseUrl = this.baseInputElement.dataset['memberListSource'];
		return baseUrl + (baseUrl.includes('?') ? '&' : '?') + 'name=' + keyword;
	}

	// by default, display items with photo
	isSelectorItemsWithPhoto() {
		const itemsWithPhoto = this.baseInputElement.dataset['itemsWithPhoto'];
		return !itemsWithPhoto || itemsWithPhoto === "true";
	}

	// requirement: data source must contain an 'profilePageUrl' attribute
	isProfileLinkSelectorMode() {
		const profileLinkSelectorMode = this.baseInputElement.dataset['profileLinkMode'];
		return profileLinkSelectorMode && profileLinkSelectorMode === "true";
	}

	// TODO: get rid of this functionality
	//  implemented to support case which still use member 'name' over 'identifier' for search
	//  e.g. on MEP's for assistants, advanced search and homepage map
	// by default, use member identifier
	shouldUseMemberNameAsValue() {
		const memberNameAsValue = this.baseInputElement.dataset['memberNameAsValue'];
		return memberNameAsValue && memberNameAsValue === "true";
	}

	// by default, form won't be submitted when autocomplete item is selected
	submitOnAutocompleteItemSelect() {
		const submitOnSelect = this.baseInputElement.dataset['submitOnItemSelect'];
		return submitOnSelect && submitOnSelect === "true";
	}
}
