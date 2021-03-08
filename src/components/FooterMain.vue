<template>
    <div class="wrapper">
    <footer class="footer-wrapper">
        <div class="section-1">
            <h2>About Us</h2>
            <p>Welcome to mia habib productions. This page will provide you with the info you need</p>
        </div>
        <div class="section-2">
            <h2>Links</h2>
            <ul>
                <li class="link"><a href="">Visit us at home</a></li>
                <li class="link"><a href="">Learn more about us</a></li>
                <li class="link"><a href="">Products &amp; Services</a></li>
                <li class="link"><a href="">
                    Read our blog</a></li>
                <li class="link"><a href="">Contact us today</a></li>
            </ul>
        </div>
        <div class="section-3 address">
            <h2>Address</h2>
            <address itemscope itemtype="http://schema.org/PostalAddress">
                <span itemprop="name">Mia Haugland Habib</span><br>
                <span itemprop="streetAddress">Oslo 0653 </span><br>
                <span itemprop="addressCountry">United States</span><br><br>
                <span>miahabib@gmail.com</span><br>
                <span>+47 90 16 88 82</span>
            </address>
        </div>
        <div class="social">
            <div class="social-group">
                <div class="social-item">
                    <a href="#"><i class="fab fa-instagram fa-3x"></i></a>
                </div>
                <div class="social-item">
                    <a href="#"><i class="fab fa-facebook fa-3x"></i></a>
                </div>
                <div class="social-item">
                    <a href="#"><i class="fab fa-twitter fa-3x"></i></a>
                </div>
                <div class="social-item">
                    <a href="#"><i class="fab fa-linkedin fa-3x"></i></a>
                </div>
                <div class="social-item">
                    <a href="#"><i class="fab fa-youtube fa-3x"></i></a>
                </div>
            </div>
        </div>
        <div class="copyright"><sub><span>Mia habib productions</span>&copy; <span class="year"></span></sub></div>
    </footer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })

    export default class FooterMain extends Vue {
        created(): void {

        }
    }

</script>

<style lang="scss" scoped>


    body {
        margin: 2rem;
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
        outline: none;
    }
    /* ---------------------- SETUP above - aesthetics only */
    $header2-font: 1.3rem;
    $font-size: 1.1rem;
    $hover-color: #000;
    $opacity: 0.85;
    $padding: 2rem;
    $primary-color: #ededed;
    $primary-column: 55%;
    $radius: 5px;
    $secondary-color: #333;

    .wrapper{
        width: 100%;
        background: $primary-color;
        padding: 50px 0;
    }

    // link styling defaults
    a {
        color: $secondary-color;

        &:active,
        &:focus,
        &:hover {
            color: $hover-color;
        }
    }

    h2 {
        color:  $secondary-color;
        font-size: $header2-font;
        margin: 5px auto;
        text-transform: uppercase;
    }
    p,
    address {
        color: $secondary-color;
        font-weight: 300;
        margin-top: 20px;
    }

    // style footer element
    .footer-wrapper {
        max-width: 1100px;
        margin: 0 auto;
        //background-color: $primary-color;
        // border: $secondary-color 1px solid;
        display: grid;
        grid-gap: 10px;
        grid-template-areas:
                "section-1"
                "section-2"
                "section-3"
                "social"
                "copyright";
        grid-template-columns: fit-content;
        justify-items: stretch;
        max-height: min-content;
        width: inherit;

        @media screen and (min-width: 600px) {
            grid-template-areas:
                    "section-1 section-1"
                    "section-2 section-3"
                    "copyright social";
        }

        @media screen and (min-width: 1200px) {
            grid-template-areas:
                    "section-1 section-2 section-3"
                    "copyright social social";
        }

        div[class^="section"] {
            font-size: $font-size;
            text-align: left;
        }

        & > div {
            // border: 1px dashed white;
            padding: 1rem;
            text-align: center;
        }

        .section-1 {
            grid-area: section-1;

            @media screen and (min-width: 600px) {
                text-align: left;
            }
        }

        .section-2 {
            grid-area: section-2;

            @media screen and (min-width: 600px) {
                text-align: left;
            }

            @media screen and (min-width: 1200px) {
                text-align: center;
            }
        }

        .section-3 {
            grid-area: section-3;

            @media screen and (min-width: 600px) {
                text-align: left;
            }

            @media screen and (min-width: 1200px) {
                text-align: right;
            }
        }

        .social {
            grid-area: social;
        }

        .copyright {
            grid-area: copyright;

            @media screen and (min-width: 600px) {
                text-align: left;
            }
        }
    }

    ul {
        list-style: none;
        margin-top: 20px;
        padding-left: 0;

        li.link {
            display: block;
            margin-top: 10px;
        }
    }

    .social-group {
        align-items: center;
        display: grid;
        grid-auto-rows: minmax(30px, 1fr);
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(30px, max-content));
        justify-content: center;
        // justify-items: center;
        list-style: none;
        margin: auto;
        padding: 0;

        @media screen and (min-width: 600px) {
            justify-content: right;
        }

        .social-item {
            font-size: 0.5rem;
        }
    }

    .copyright > sub > span {
        color: #333;
    }
    .copyright > sub {
        color: darken($hover-color, 10%);
    }

</style>
