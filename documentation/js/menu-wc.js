'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic-hoidanit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' : 'data-bs-target="#xs-controllers-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' :
                                            'id="xs-controllers-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' : 'data-bs-target="#xs-injectables-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' :
                                        'id="xs-injectables-links-module-AppModule-99e9a4ff279760b8f78d144e55828dacfcceed08294fbc149a4d6c12f82152bea2aa6b510e97ae1dd6f19905ea5334746801a8ecc3938af0ecfd50bb97844756"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' :
                                            'id="xs-controllers-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' :
                                        'id="xs-injectables-links-module-AuthModule-94ec0c44773c2074726b2771d353f4fce5bddb1caab2c24871d5239550a8f740ce21d339155b94bb9e81cbb79506ad6433e11380de7678c78efa939bd8bbacb2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' :
                                            'id="xs-controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' :
                                        'id="xs-injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' :
                                            'id="xs-controllers-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' :
                                        'id="xs-injectables-links-module-DatabasesModule-6d30ab0f486b8fe8dd8e552596b161143936fb1c6e3e35a0e46d560788674584bd27202254735cf8461abf7d56d6b5eccaec2e892d1f70c93db0043c182c8069"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' :
                                            'id="xs-controllers-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' :
                                        'id="xs-injectables-links-module-FilesModule-525ad5ee676a275c31ff793b1af3c4b0bd744bd57f81f1aaa6066d61f4692c5d6024fb785aa3f757a8f0a873897dcd291dd75d0658bc00659fe44a65fc2440bd"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' :
                                            'id="xs-controllers-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' :
                                        'id="xs-injectables-links-module-JobsModule-c09c5ad428e581de624f80a28104bad476b395616b7a662b01d5662135a269de8bed042ff8cc543a2562eb8639fb760e078dcd745c5f91d2f0b1a29f8c3284c2"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' : 'data-bs-target="#xs-controllers-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' :
                                            'id="xs-controllers-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' : 'data-bs-target="#xs-injectables-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' :
                                        'id="xs-injectables-links-module-MailModule-ca0bc11d82905c67522969a3417b6e093b413de8f9c217af7765f205119d0fc4f250e843d8f443d22978529e372e8b5d816b3467a38cdce2db2e9760454ae0e2"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' :
                                            'id="xs-controllers-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' :
                                        'id="xs-injectables-links-module-PermissionsModule-1a0086d7f223b63bab3a23b9b8e4a5d4cb42c8f8edcb437c3eb01f13fba2e75366fa548b598e14e807b74923ddb1c54e42ecd75b4a42a15e49d9fe32d3175029"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' :
                                            'id="xs-controllers-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' :
                                        'id="xs-injectables-links-module-ResumesModule-499121b4bb608fd266e0d80e3d410c579dd36e1d3b808f7d74fb0e9687aa6c1a7194b72bb87ed0f9008b6bbac5fe04a7a50c35b8095a47b90dd24f695deb860d"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' :
                                            'id="xs-controllers-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' :
                                        'id="xs-injectables-links-module-RolesModule-c67cf0b88e4fa4b77bc001b3a41a3b7e34577dfa5d8a75d7514c69d6f0c34a77eeb43693a31d230f56cfbe111540e33abef07750e3b87a69c05c927af6b02821"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' :
                                            'id="xs-controllers-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' :
                                        'id="xs-injectables-links-module-SubscribersModule-1065bcc30fe74df25f1e8f4fa02a0b9bb9728de56cc45b206f8d23242cfb49804bcb17a6f062bfe1bc8b89fa7e6006873333464020a7417de9b3bcce2379ea88"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' :
                                            'id="xs-controllers-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' :
                                        'id="xs-injectables-links-module-UsersModule-84df61585f5a0e9002b03e7ba0af8c6d0de1498724872f31663074f41a68d67816740f322409c854d47982674f9fba1a298234b2c339bf1eb0854a871e77bb91"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/job.html" data-type="entity-link" >job</a>
                            </li>
                            <li class="link">
                                <a href="classes/permission.html" data-type="entity-link" >permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/resume.html" data-type="entity-link" >resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/role.html" data-type="entity-link" >role</a>
                            </li>
                            <li class="link">
                                <a href="classes/subscriber.html" data-type="entity-link" >subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/user.html" data-type="entity-link" >user</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});