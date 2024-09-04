const useIsMobile = (): boolean => {
  const userAgent = navigator.userAgent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
}

export default useIsMobile
