<template>
  <footer>
    <div class="container center">
      <div class="title">
        <p>{{ $t('footer.didYouNotFindThePositionYouWereLookingFor') }}</p>
        <p>{{ $t('footer.weAreAlwaysHereForNewCadidates') }}</p>
      </div>
    
      <div class="grid-ct">
        <div class="address-ct">
          <p class="font-semibold">
            {{ $t('footer.csu') }} 
            &verbar; 
            {{ $t('footer.coop') }}
          </p>
          <p>{{ $t('common.csuAddress') }}</p>
          <p>{{ $t('common.capAndBz') }}</p>
        </div>
        <div class="contacts-ct">
          <p class="font-semibold">{{ $t('common.contacts') }}</p>
          <p class="underline">
            <a href="tel:+390471324239">{{ $t('common.csuTelephone') }}</a>
            </p>
          <p class="underline">
            <a href="mailto:info@csu-online.it">{{ $t('common.info') }}&commat;{{ $t('common.csuEmail') }}</a>
          </p>
        </div>
        <div class="iva-ct">
          <p>{{ $t('common.pIva') }}</p>
          <p>{{ $t('footer.destinationCode') }}</p>
        </div>
        <div class="links-ct">
          <a href="https://irp.cdn-website.com/78321997/files/uploaded/risk%20map%20CSU%20rev.%2012%202022.pdf">{{ $t('footer.riskMap') }}</a>
          <a href="https://www.csu-online.it/codice-etico">{{ $t('footer.ethicCode') }}</a>
          <a href="https://www.csu-online.it/risk-map">{{ $t('footer.mog') }}</a>
        </div>
      </div>

      <div class="copyright">
        &copy;
        {{ $t('footer.allRightsReserved') }}
        &verbar;
        {{ $t('footer.csu') }}
        {{ $t('footer.coop') }}
        &CenterDot;
        <a href="https://www.csu-online.it/privacy-e-cookie">{{ $t('footer.privacyAndCoockie') }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
footer {
  @apply bg-primary text-sm text-white pt-14 pb-4;

    & .container {
      & .title {
        @apply text-center text-2xl mb-14;
      }
      & .grid-ct {
        @apply grid grid-cols-5 gap-2;
          & .iva-ct{
            @apply grid col-start-4 col-end-4;
          }
          & .links-ct {
            @apply grid col-start-5 col-end-5 font-semibold underline;
            & a {
              @apply block;
            }
          }
      }
      & .copyright {
        @apply text-center mt-14;

        & a {
          @apply underline;
        }
      }
    }
}

@media only screen and (max-width: 980px) {
  footer {
    @apply py-12;

    & .container {
      & .title {
        @apply text-xl;
      }

      & .grid-ct {
        @apply flex flex-col items-center text-center gap-6;

        & .box-left {
          @apply flex-col;
        }

        & .box-right {
          @apply flex-col;
        }
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  footer {
    & .container {
      & .grid-ct {
        & .box-left {
          @apply w-full;
        }
      }
    }
  }
}
</style>
