<template>
    <footer class="footer bg-light">
        <div class="footer__copyright">
            &copy; 2018 Old School. All right reserved.
        </div>
        <div class="footer__social-links">
            <a href="" 
               class="fa fa-twitter text-secondary footer__social-link footer__social-link_twitter" 
               target="_blank">
            </a>
            <a href="" 
               class="fa fa-facebook-official text-secondary footer__social-link footer__social-link_facebook" 
               target="_blank">
            </a>
            <a href="" 
               class="fa fa-vk text-secondary footer__social-link footer__social-link_vk" 
               target="_blank">
            </a>
            <a href="" 
               class="fa fa-telegram text-secondary footer__social-link footer__social-link_telegram" 
               target="_blank">
            </a>
        </div>
    </footer>
</template>

<script>
    
</script>

<style lang="scss" scoped>
    .footer {
        align-items: center;
        border-top: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        min-width: 460px;
        padding: 10px;
        position: relative;
        z-index: 5;
        
        &__copyright {
            font: {
                size: 12px;
                weight: bold;
            }
        }
        
        &__social-links {
            display: flex;
            justify-content: space-between;
            width: 150px;
        }
        
        &__social-link {
            font-size: 22px;
            
            &:hover {
                text-decoration: none;
            }
        }
    }
</style>