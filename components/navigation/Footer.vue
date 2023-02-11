<template>
  <footer>
    <div class="container center">
      <div class="box-left">
        <ul>
          <li>{{ $t("footer.didYouNotFindThePositionYouWereLookingFor") }}</li>
          <li>{{ $t("footer.weAreAlwaysHereForNewCadidates") }}</li>
        </ul>
        <a href="mailto:info@csu-online.it" class="btn-ct">
          <Button
            :value="$t('common.info') + '@' + $t('common.csuEmail')"
            type="secondary"
            icon="arrow-up-right"
          />
        </a>
      </div>
      <div class="box-right">
        <ul class="coop-ct">
          <li>{{ $t("footer.csuCoop") }}</li>
          <li>{{ $t("common.csuAddress") }}</li>
        </ul>
        <ul>
          <li>{{ $t("common.contacts") }}</li>
          <li>
            {{ $t("common.csuTelephone") }}
            <br />
            {{ $t("common.csuEmail") }}
          </li>
          <li>{{ $t("common.pIva") }}</li>
          <li>{{ $t("common.actualIva") }}</li>
          <li>{{ $t("footer.destinationCode") }}</li>
          <li>{{ $t("footer.actualDestinationCode") }}</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
footer {
  @apply bg-primary text-sm text-white py-10;

  & .container {
    @apply grid grid-cols-2;
    & .box-left {
      @apply w-1/2 flex flex-col justify-start;

      & ul {
        & li {
          @apply even:w-2/3 
                        odd:w-1/2 odd:mb-2 odd:text-light-grey odd:opacity-50;
        }
      }

      & .btn-ct {
        @apply flex;
      }
    }
    & .box-right {
      @apply flex;
      & .coop-ct {
        @apply flex flex-col;
      }

      & ul {
        @apply w-1/2 h-1/2;
        & li {
          @apply odd:mt-4 odd:text-light-grey odd:uppercase odd:opacity-50;
        }
      }
    }
  }
}

@media only screen and (max-width: 980px) {
  footer {
    @apply py-12;

    & .container {
      @apply flex flex-col gap-6;

      & .box-left {
        @apply flex-col;
      }

      & .box-right {
        @apply flex-col;
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  footer {
    & .container {
      & .box-left {
        @apply w-full;
      }
    }
  }
}
</style>
