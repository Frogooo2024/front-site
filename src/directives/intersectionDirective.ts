export default {
  mounted: (el: any, binding: any) => {
    const observer100 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (binding.value == 'overseasIntersection') {
              el.classList.add('el-intersection')
            }
            observer100.unobserve(el)
          } else if (binding.value == 'frogoooLogo') {
            el.classList.add('animate__animated', 'animate__flash')
          }
        })
      },
      { threshold: 1 }
    )

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (binding.value == 'advanceIntersection') {
            el.classList.add('animate__animated', 'animate__lightSpeedInRight')
            // el.querySelector('.most-advance-border').classList.add(
            //   'animate__animated',
            //   'animate__fadeIn'
            // )
            // el.querySelector('.most-advance-border').style.animationDuration = '2s'
            // el.querySelector('.most-advance-description').classList.add(
            //   'animate__animated',
            //   'animate__lightSpeedInRight'
            // )
            observer.unobserve(entry.target)
          } else if (binding.value == 'advantage_title_0') {
            el.classList.add('animate__animated', 'animate__fadeInLeft')
            el.querySelector('.advantage-description-important').style.transitionDelay = '0.6s'
            el.querySelector('.advantage-description-important').style.transform =
              'scale(1) translate(0, 0)'
            el.querySelector('.advantage-description-important').style.opacity = 1
          } else if (binding.value == 'advantage_image_0') {
            el.classList.add('animate__animated', 'animate__fadeInRight')
          } else if (binding.value == 'advantage_title_1') {
            el.classList.add('animate__animated', 'animate__fadeInLeft')
            el.querySelector('.advantage-description-important').style.transitionDelay = '0.6s'
            el.querySelector('.advantage-description-important').style.transform =
              'scale(1) translate(0, 0)'
            el.querySelector('.advantage-description-important').style.opacity = 1
          } else if (binding.value == 'advantage_image_1') {
            el.classList.add('animate__animated', 'animate__fadeInRight')
          } else if (binding.value == 'advantage_title_2') {
            el.classList.add('animate__animated', 'animate__fadeInLeft')
            el.querySelector('.advantage-description-important').style.transitionDelay = '0.6s'
            el.querySelector('.advantage-description-important').style.transform =
              'scale(1) translate(0, 0)'
            el.querySelector('.advantage-description-important').style.opacity = 1
          } else if (binding.value == 'advantage_image_2') {
            el.classList.add('animate__animated', 'animate__fadeInRight')
          } else if (binding.value == 'advantage_title_3') {
            el.classList.add('animate__animated', 'animate__fadeInLeft')
            el.querySelector('.advantage-description-important').style.transitionDelay = '0.6s'
            el.querySelector('.advantage-description-important').style.transform =
              'scale(1) translate(0, 0)'
            el.querySelector('.advantage-description-important').style.opacity = 1
          } else if (binding.value == 'advantage_image_3') {
            el.classList.add('animate__animated', 'animate__fadeInRight')
          } else if (binding.value == 'advantage_row') {
            el.classList.add('animate__animated', 'animate__fadeInUp')
            el.querySelector('.advantage-description-important').style.transitionDelay = '0.8s'
            el.querySelector('.advantage-description-important').style.transform =
              'scale(1) translate(0, 0)'
            el.querySelector('.advantage-description-important').style.opacity = 1
          } else if (binding.value == 'shipping-fee') {
            el.style.transform = 'scale(1) translate(0, 0)'
            el.style.opacity = 1
          }
          observer.unobserve(el)
        }
      })
    })
    observer100.observe(el)
    observer.observe(el)
  }
}
