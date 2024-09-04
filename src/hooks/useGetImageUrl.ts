import useIsMobile from '../hooks/useIsMobile'

export const getLogoImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(`../assets/icons/${isMobile ? 'logo.png' : '2.0x/logo.png'}`, import.meta.url).href
}

export const getTitleBgImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'title_bg.png' : '2.0x/title_bg.png'}`,
    import.meta.url
  ).href
}

export const getBrandImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return [
    new URL(
      `../assets/icons/${isMobile ? 'ali_express.png' : '2.0x/ali_express.png'}`,
      import.meta.url
    ).href,
    new URL(`../assets/icons/${isMobile ? 'amazon.png' : '2.0x/amazon.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'ebay.png' : '2.0x/ebay.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'lululemon.png' : '2.0x/lululemon.png'}`, import.meta.url)
      .href,
    new URL(`../assets/icons/${isMobile ? 'qoo10.png' : '2.0x/qoo10.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'shein.png' : '2.0x/shein.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'taobao.png' : '2.0x/taobao.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'vip_shop.png' : '2.0x/vip_shop.png'}`, import.meta.url)
      .href
  ]
}

export const getHighlySecureImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'highly_secure.png' : '2.0x/highly_secure.png'}`,
    import.meta.url
  ).href
}

export const getFullRefundGuaranteeImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'refund_guarantee.png' : '2.0x/refund_guarantee.png'}`,
    import.meta.url
  ).href
}

export const getFullRocketImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(`../assets/icons/${isMobile ? 'rocket.png' : '2.0x/rocket.png'}`, import.meta.url)
    .href
}

export const getComprehensiveServiceImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'comprehensive_service.png' : '2.0x/comprehensive_service.png'}`,
    import.meta.url
  ).href
}

export const getTrustworthyAndReliableImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'trustworthy_and_reliable.png' : '2.0x/trustworthy_and_reliable.png'}`,
    import.meta.url
  ).href
}

export const getTrustworthyAndReliableLogoImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'trustworthy_and_reliable_logo.png' : '2.0x/trustworthy_and_reliable_logo.png'}`,
    import.meta.url
  ).href
}

export const getWhatsAppImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return new URL(
    `../assets/icons/${isMobile ? 'whats_app.png' : '2.0x/whats_app.png'}`,
    import.meta.url
  ).href
}

export const getIconImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return [
    new URL(`../assets/icons/${isMobile ? 'icon1.png' : '2.0x/icon1.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'icon3.png' : '2.0x/icon3.png'}`, import.meta.url).href,
    new URL(`../assets/icons/${isMobile ? 'icon4.png' : '2.0x/icon4.png'}`, import.meta.url).href
  ]
}

export const getContactListItemImageUrl = () => {
  const isMobile: boolean = useIsMobile()
  return [
    new URL(`../assets/icons/${isMobile ? 'facebook.png' : '2.0x/facebook.png'}`, import.meta.url)
      .href,
    new URL(`../assets/icons/${isMobile ? 'twitter.png' : '2.0x/twitter.png'}`, import.meta.url)
      .href,
    new URL(`../assets/icons/${isMobile ? 'instagram.png' : '2.0x/instagram.png'}`, import.meta.url)
      .href,
    new URL(`../assets/icons/${isMobile ? 'youtube.png' : '2.0x/youtube.png'}`, import.meta.url)
      .href,
    new URL(`../assets/icons/${isMobile ? 'tiktok.png' : '2.0x/tiktok.png'}`, import.meta.url).href
  ]
}
