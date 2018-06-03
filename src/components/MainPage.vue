<template>
    <main class="main" :class="'main_' + state">
        <div class="column">
            <section class="services main__services">
                <div class="card services__service" 
                     v-for="service in services" 
                     :key="service.id">
                    <img class="card-img-top services__service-header-image" 
                         :src="service.imagePath" 
                         :alt="`${service.title} - ${service.price}€`" 
                         :title="`${service.title} - ${service.price}€`">
                    <div class="card-body services__service-body">
                        <h3 class="card-title services__service-body-title">
                            {{ service.title }}
                        </h3>
                        <div class="card-text services__service-body-price">
                            {{ service.price }}&euro;
                        </div>
                        <button class="btn btn-success services__service-body-submit" 
                                type="button" 
                                @click="$emit('unauthorized')" 
                                v-if="currentUserId === null">
                            <span class="fa fa-shopping-cart services__service-body-icon_order">
                            </span>
                            Order
                        </button>
                        <button class="btn btn-success services__service-body-submit 
                                       services__service-body-submit_order-in-personal-area" 
                                type="button" 
                                @click="$emit('orderInPersonalArea', service.id)" 
                                v-else>
                            <span class="fa fa-shopping-cart services__service-body-icon_order">
                            </span>
                            Order in personal area
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
    export default {
        props: ['state', 'services', 'currentUserId'],
    }
</script>

<style lang="scss" scoped>
    .main {
        &_main-page {
            background: url('/public/img/background.jpg') top center/cover no-repeat fixed;
            position: static;
        }
    }
    
    .services {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        
        &__service {
            box-shadow: 0 2px 5px 0 rgba(black, 0.8);
            margin: 10px;
            width: 540px;
            
            &-body {
                box-shadow: inset 0 3px 3px 0 rgba(black, 0.5);
                text-align: center;
                
                &-title, &-price, &-submit {
                    margin: 10px 0;
                }
                
                &-title {
                    font-size: 38px;
                    display: inline-block;
                }
                
                &-price, &-submit {
                    font-size: 20px;
                }
            }
        }
    }
    
    @media screen and (max-width: 1139px) {
        .services {            
            &__service {
                width: 430px;
            }
        }
    }
    
    @media screen and (max-width: 973px) {
        .services {            
            &__service {
                margin-left: auto;
                margin-right: auto;
                width: 540px;
            }
        }
    }
    
    @media screen and (max-width: 789px) {
        .services {
            &__service, &__service-header-image {
                border-radius: 0;
            }
            
            &__service {
                border: 0;
                margin-bottom: 0;
                margin-top: 0;
            }
        }
    }
</style>