<template>
    <div class="page" ref="page" :style="{ position: fixedBody }">
        <pop-up :popUpType="popUpType" 
                :users="users" 
                @setPopUpType="setPopUpType" 
                @setCurrentUserId="setCurrentUserId">
        </pop-up>
        <custom-header :state="state" 
                       :currentUser="currentUser" 
                       @signOut="setCurrentUserId(null)" 
                       @changeState="changeState" 
                       @setPopUpType="setPopUpType">
        </custom-header>
        <main-page v-if="state === 'main-page'" 
                   :state="state" 
                   :services="services" 
                   :currentUserId="currentUserId" 
                   @unauthorized="setPopUpType('auth')" 
                   @orderInPersonalArea="orderInPersonalArea">
        </main-page>
        <custom-footer v-if="state === 'main-page'"></custom-footer>
        <personal-area v-else 
                       :state="state" 
                       :orderedServices="orderedServices" 
                       :services="services" 
                       :preferServiceId="preferServiceId" 
                       @setPopUpType="setPopUpType" 
                       @changePreferServiceId="orderInPersonalArea">
        </personal-area>
    </div>
</template>

<script>
    export default {
        data() {
            const currentUserId = localStorage.getObj('currentUserId');
            
            return {
                currentUserId,
                // Allowed states: 'main-page', 'personal-area'.
                state: 'main-page',
                // See description of ordering via main page in README.
                preferServiceId: null,
                // Allowed types: 'confirm', 'reg', 'auth', null.
                popUpType: null,
                isAuthorized: currentUserId !== null,
                services: localStorage.getObj('services'),
                users: localStorage.getObj('users'),
            }
        },
        computed: {
            currentUser() {
                return this.currentUserId !== null ? this.users[this.currentUserId] : null;
            },
            orderedServices() {
                return this.currentUser ? this.currentUser.orderedServices : [];
            },
            fixedBody() {
                return this.popUpType !== null ? 'fixed' : 'initial';
            }
        },
        methods: {
            // Here there are some one-lined functions to prevent the Vue warning:
            // "Avoid mutating a prop directly since the value will be overwritten whenever 
            // the parent component re-renders."
            // It's corresponds to "Parent-Child Communication" idea.
            changeState(newState) {
                this.state = newState;
            },
            changePreferServiceId(newId) {
                this.preferServiceId = newId;
            },
            setPopUpMessage(message) {
                this.popUpMessage = message;
            },
            setIsAuthorized(isAuthorized) {
                this.isAuthorized = isAuthorized;
            },
            setCurrentUserId(newCurrentUserId) {
                this.currentUserId = newCurrentUserId;
            },
            setCancelledServiceId(newId) {
                this.cancelledServiceId = newId;
            },
            setPopUpType(newPopUpType) {
                this.popUpType = newPopUpType;
            },
            orderInPersonalArea(preferServiceId) {
                this.changeState('personal-area');
                this.changePreferServiceId(preferServiceId);
            },
            changeUsersInLocalStorage() {
                if(localStorage.users !== JSON.stringify(this.users)) {
                    localStorage.setObj('users', this.users);
                }
            },
        },
        watch: {
            isAuthorized() {
                this.isAuthorized ? this.changeState(this.state) : this.changeState('main-page');
            },
            orderedServices() {
                this.changeUsersInLocalStorage();
            },
            users() {
                this.changeUsersInLocalStorage();
            },
            currentUserId(newValue) {
                this.isAuthorized = newValue !== null;
                localStorage.setObj('currentUserId', newValue);
            },
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/index.scss';
    
    .page {
        width: 100%;
    }
    
    .column {
        margin: 0 auto;
        min-width: 460px;
        width: 1120px;
    }
    
    .custom-control-label {
        &:hover {
            cursor: pointer;
        }
        
        &::before, &::after {
            top: 0.1rem;
        }
    }
    
    // Customization of Bootstrap custom checkbox.
    .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
        background-color: #28a745;
    }
    
    .custom-control-input:focus ~ .custom-control-label::before {
        box-shadow: none;
    }
    
    @media screen and (max-width: 1139px) {
        .column {
            width: 900px;
        }
    }
    
    @media screen and (max-width: 973px) {
        .column {
            width: 765px;
        }
    }
    
    @media screen and (max-width: 789px) {
        .column {
            width: 100%;
        }
    }
</style>