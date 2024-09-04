<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['prohibition-close-clicked'])

const closeClicked = () => {
  emit('prohibition-close-clicked')
}
const currentLanguage = ref('')
const storageLanguage = window.localStorage.getItem('frgoooLanguage')
if (storageLanguage) {
  currentLanguage.value = storageLanguage.includes('id-ID') ? 'Bahasa indonesia' : 'English'
} else {
  currentLanguage.value = navigator.language.includes('id-ID') ? 'Bahasa indonesia' : 'English'
}
window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="prohibition-list-item">
    <div class="prohibition-list-item-container">
      <div class="prohibition-list-item-title">
        <span class="title">{{ $t('Frogooo.DANGEROUSGOODS') }}</span>
        <img src="../assets/icons/close.png" alt="" @click="closeClicked" />
      </div>
      <div class="list-item-container" v-if="currentLanguage == 'English'">
        <h3>Dangerous goods class 1:</h3>
        <p>Fireworks, Ammunition/cartridges, Airbag inflators, TNT compositions, Flares</p>
        <h3>Dangerous goods class 2:</h3>
        <p>Aerosol, Gas Cylinder (filled), Silicon, Fire Stop, Nail Polish, Gas CO2</p>
        <h3>Dangerous goods class 3:</h3>
        <p>Glue, Parfume, Paint Cans, Oil, Sanpoly, Toner, Gasoline gauge</p>
        <h3>Dangerous goods class 4:</h3>
        <p>Alkali metals, Alumunium phosephide, Carbon, Camphor, Oily fabrics</p>
        <h3>Dangerous goods class 5:</h3>
        <p>Organic peroxides, Oxidizing substances</p>
        <h3>Dangerous goods class 6:</h3>
        <p>Pesticide,Toner Powder,Insecticide</p>
        <h3>Dangerous goods class 7:</h3>
        <p>Radioactive materials</p>
        <h3>Dangerous goods class 8:</h3>
        <p>Corrosive Liquids, Crust cleaning liquid</p>
        <h3>Dangerous goods class 9:</h3>
        <p>
          Battery, Empty Tank, Emergency Battery, Laptop Battery,Power Bank, Dry Accu, Laptop,
          Insecticide, Zippo, Digital Scale, Mic, Dinamo, Cylinder head, Magnet, Lithium Battery,
          Handphone.
        </p>
        <h2>PROHIBITED GOODS</h2>
        <p class="goods">
          <span>Firearms:</span>All kinds of ammunitions, firearms, bullets, grenades, bombs, etc
        </p>
        <p class="goods">
          <span>Explosive Materials:</span>Easily explosive materials like explosive materials &
          detonator, gunpowder, firecrackers, etc
        </p>
        <p class="goods">
          <span>Flammable:</span>All kinds of flammable material, including liquid, gas and solid
          chemistry. Like gasoline, kerosene, alcohol, varnish, diesel fuel, aerosol/ spray tube,
          lighters, gas holder, phosphorus, sulfur, matches, etc
        </p>
        <p class="goods">
          <span>Drugs:</span>Chemical: All kinds of narcotic drugs like, opium (including flowers,
          sprout and opium leaf), morn, cocaine, heroin, marijuana, methamphetamine, ephedrine, and
          other related products
        </p>
        <p class="goods">
          <span>Chemical:</span>All kinds of corrosive materials like sulfuric acid, hydrochloric
          acid, nitric acid, organic solvents, pesticide, hydrogen peroxide, and other hazardous
          chemicals
        </p>
        <p class="goods">
          <span>Radioactive:</span>Various types of radioactive elements and its depository like
          uranium, cobalt, radium and plutonium
        </p>
        <p class="goods">
          <span>Propaganda Materials:</span>Goods that endanger national security and stability of
          publication for social and political like, propaganda materials and its printing materials
          etc
        </p>
        <p class="goods">
          <span>Organs:</span>Various goods that can harm health, like animal bones or other limbs,
          animal organs, unproccesed animal skins, and animal bones without or before safely process
        </p>
        <p class="goods">
          <span>Prohibited by Law:</span>Goods that are prohibited to be circulated according to
          laws and regulation of country like, document, state secret information, currency,
          counterfeit money, all kinds of securities paper, replica weapons, sharp weapon, art
          goods, rare animals and finished product
        </p>
        <p class="goods">
          <span>Inappropirate Packaging Material:</span>Goods with inappropriate packaging, which
          can endanger, caused pollution, or goods that can pollute partial or total part of other
          shipment
        </p>
      </div>
      <div class="list-item-container" v-else>
        <h3>Barang berbahaya kelas 1:</h3>
        <p>Kembang Api,Amunisi/Kartrid,Inflator Airbag,Komposisi TNT,Suar</p>
        <h3>Barang berbahaya kelas 2 ：</h3>
        <p>Aerosol, TabungGas (berisi), Silikon, Fire Stop, Kutek, Gas CO2</p>
        <h3>Barang berbahaya kelas 3:</h3>
        <p>Lem, Parfume, Cat kaleng, Oli, Sanpoly, Toner, Pelampung bensin</p>
        <h3>Barang berbahaya kelas 4:</h3>
        <p>Alkali metal, Alumunium fosfit, Karbon, Kamper, Kain berminyak</p>
        <h3>Barang berbahaya kelas 5:</h3>
        <p>Peroksida organic, Zat pengoksidasi</p>
        <h3>Barang berbahaya kelas 6:</h3>
        <p>Obat Tanaman, Serbuk Toner, Racun semut & kecoa</p>
        <h3>Barang berbahaya kelas 7:</h3>
        <p>Material Radioaktif</p>
        <h3>Barang berbahaya kelas 8:</h3>
        <p>Cairan Corrosive, Cairan pembersih kerak</p>
        <h3>Barang berbahaya kelas 9:</h3>
        <p>
          Baterai, Tangki kosong, Baterai Emergency, Baterai Laptop, Power Bank, Aki Kering, Laptop,
          Cairan racun serangga, Zippo, Timbangan digital, Mic, Dinamo, Cylinder head, Magnet,
          Baterai Lithium, Ponsel.
        </p>
        <h2>BARANG TERLARANG</h2>
        <p class="goods">
          <span>Senjata Api:</span>Segala jenis amunisi, senjata api, peluru, granat, bom, dll.
        </p>
        <p class="goods">
          <span>Bahan Peledak:</span>Bahan mudah meledak seperti bahan peledak & detonator, mesiu,
          petasan, dll.
        </p>
        <p class="goods">
          <span>Bahan Mudah Terbakar:</span> Semua jenis bahan yang mudah terbakar, termasuk cairan,
          gas dan kimia padat. Seperti bensin, minyak tanah, alkohol, pernis, bahan bakar diesel,
          aerosol/tabung semprot, korek api, gas holder, fosfor, sulfur, korek api, dll.
        </p>
        <p class="goods">
          <span>Narkoba:</span> Semua jenis obat-obatan narkotika seperti opium (termasuk bunga,
          tunas dan daun opium), morn, kokain, heroin, ganja, shabu, efedrin, dan produk-produk
          terkait lainnya
        </p>
        <p class="goods">
          <span>Bahan Kimia:</span>Semua jenis bahan korosif seperti asam sulfat, asam klorida, asam
          nitrat, pelarut organik, pestisida, hidrogen peroksida, dan bahan kimia berbahaya lainnya.
        </p>
        <p class="goods">
          <span>Radioaktif:</span>Berbagai jenis unsur radioaktif dan penyimpanannya, seperti
          uranium, kobalt, radium dan plutonium.
        </p>
        <p class="goods">
          <span>Bahan Propaganda:</span>Barang yang membahayakan keamanan nasional dan stabilitas
          publikasi untuk sosial dan politik seperti bahan propaganda dan bahan pencetakannya, dll
        </p>
        <p class="goods">
          <span>Organ:</span> Berbagai barang yang dapat membahayakan kesehatan, seperti tulang
          hewan atau anggota badan lainnya, organ hewan, kulit binatang yang belum diproses, dan
          tulang hewan tanpa atau sebelum diproses dengan aman.
        </p>
        <p class="goods">
          <span>Dilarang Hukum:</span>Barang yang dilarang untuk diedarkan sesuai dengan hukum dan
          peraturan negara seperti dokumen, informasi rahasia negara, mata uang, uang palsu, semua
          jenis kertas surat berharga, senjata replika, senjata tajam, barang seni, hewan langka dan
          produk jadi.
        </p>
        <p class="goods">
          <span>Bahan Kemasan yang Tidak Pantas:</span>Barang dengan kemasan yang tidak pantas, yang
          bisa membahayakan, menyebabkan polusi, atau barang yang dapat mencemari pengiriman
          lainnya, parsial atau total
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .prohibition-list-item
    width: 100%
    background: #F2F4F8
    overflow-y: auto
    color: #0A1B39
    padding: .2rem
    .prohibition-list-item-title
      display: flex
      align-items: center
      justify-content: space-between
      .title
        font-size: .24rem
        line-height: .31rem
        font-weight: 500
    .list-item-container
      margin-top: .2rem
      h3
        font-size: .2rem
        line-height: .24rem
        font-weight: 500
        margin-top: .15rem
      p
        font-size: .16rem
        line-height: .2rem
        color: rgba(10, 27, 57, 0.6)
        margin-top: .05rem
      h2
        margin-top: .3rem
        font-size: .2rem
        line-height: .24rem
        font-weight: 500
      .goods
        font-size: .16rem
        line-height: .2rem
        color: rgba(10, 27, 57, 0.6)
        margin-top: .1rem
        span
          font-weight: 500
          color: #0A1B39
          margin-right: .05rem
@media (min-width: 1024px)
  .prohibition-list-item
      width: 100%
      background: #F2F4F8
      height: 100%
      overflow-y: auto
      color: #0A1B39
      padding: 20px
      .prohibition-list-item-container
        width: 800px
        margin: 50px auto
        border-radius: 24px
        background: #fff
        padding: 16px 32px
        .prohibition-list-item-title
          display: flex
          align-items: center
          justify-content: space-between
          .title
            font-size: 24px
            line-height: 31px
            font-weight: 500
        .list-item-container
          margin-top: 20px
          h3
            font-size: 20px
            line-height: 24px
            font-weight: 500
            margin-top: 15px
          p
            font-size: 16px
            line-height: 20px
            color: rgba(10, 27, 57, 0.6)
            margin-top: 5px
          h2
            margin-top: 30px
            font-size: 20px
            line-height: 24px
            font-weight: 500
          .goods
            font-size: 16px
            line-height: 20px
            color: rgba(10, 27, 57, 0.6)
            margin-top: 10px
            span
              font-weight: 500
              color: #0A1B39
              margin-right: 5px
</style>
