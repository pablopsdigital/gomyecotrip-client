const data = {
  experiences: [
    {
      name: 'Whale Watch Tarifa',
      description:
        'Excursiones en barco en el Estrecho de Gibraltar para ver siete especies de cetáceos. Salidas especiales para ver Orcas en julio y agosto. Expertos en cetáceos informan a los pasajeros. Pioneros en la Peninsula Iberica, desde 1996.',
      currentBookings: [],
      featuredImage:
        'https://images.pexels.com/photos/2385654/pexels-photo-2385654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      galleryImgs: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/9786793/pexels-photo-9786793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/9709336/pexels-photo-9709336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      ],
      type: ['Art and culture', 'Leisure', 'Food and drink', 'Sports'],
      address: 'Rambla del Poblenou, 156, 08018 Barcelona',
      hasGroup: true,
      minPersonForGroup: 12,
      phoneNumber: '934 817 272',
      ratesForPerson: {
        adults: 15.5,
        kids: 9.0,
        babies: 3.0
      },
      map: {
        lat: 41.40706251243749,
        lng: 2.1946674306853113
      },
      saleOff: false,
      isAds: false,
      amenities: ['amenitie 1', 'amenitie 2', 'amenitie 3', 'amenitie 4', 'amenitie 5'],
      reviewStart: 4.75,
      reviewCount: 350
    },
    {
      name: 'Ecocorneyana',
      description:
        'En Corneyana y partiendo de un huerto o corralada y de cuatro edificaciones anexas, dos cuadras y dos casas, en desuso y semiderruidas que fueron construidas en su día siguiendo la suave pendiente de la ladera, lo que motiva los tres niveles actuales en la planta baja, hemos conseguido hacer habitable, y muy agradable, lo que en el año 2000 parecía un montón de piedras, tejas de 200 años, ladrillos posiblemente romanos, vigas de castaño y roble condenado a ser reducido a un solar.',
      currentBookings: [],
      featuredImage:
        'https://images.pexels.com/photos/9709336/pexels-photo-9709336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      galleryImgs: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/9786793/pexels-photo-9786793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2385654/pexels-photo-2385654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      ],
      type: ['Art and culture', 'Leisure'],
      address: 'Corneyana Campomanes Lena, s/n, 33620 Asturias',
      hasGroup: true,
      minPersonForGroup: 12,
      phoneNumber: '647 380 512',
      ratesForPerson: {
        adults: 10.5,
        kids: 13.0,
        babies: 0.0
      },
      map: {
        lat: 41.40706251243749,
        lng: 2.1946674306853113
      },
      saleOff: false,
      isAds: false,
      amenities: ['amenitie 1', 'amenitie 2', 'amenitie 3', 'amenitie 4', 'amenitie 5'],
      reviewStart: 4.75,
      reviewCount: 350
    },
    {
      name: 'Finca Botanico',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor elementum faucibus. Etiam lacus est, ullamcorper sed ipsum sit amet, dapibus tristique diam. Morbi dignissim, justo at mattis consequat, elit tortor mollis risus, vel rutrum libero mauris vel arcu. Vivamus velit orci, varius non sagittis ac, pharetra in sem. Nullam eget scelerisque magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur aliquet venenatis velit, ut gravida orci malesuada vitae. Etiam at rhoncus nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi neque, tempus quis luctus placerat, facilisis sit amet nulla. Curabitur vehicula nisl dui, in consequat magna laoreet vel. Integer at massa metus. Vestibulum ut justo non elit eleifend auctor. Maecenas varius tristique purus, eget pulvinar massa.',
      currentBookings: [],
      featuredImage:
        'https://images.pexels.com/photos/2385654/pexels-photo-2385654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      galleryImgs: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/9786793/pexels-photo-9786793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/9709336/pexels-photo-9709336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      ],
      type: ['Art and culture', 'Leisure', 'Food and drink', 'Sports'],
      address: 'Calle Tarajal, 30, 35544 Guatiza',
      hasGroup: true,
      minPersonForGroup: 12,
      phoneNumber: '619 591 579',
      ratesForPerson: {
        adults: 15.5,
        kids: 9.0,
        babies: 3.0
      },
      map: {
        lat: 41.40706251243749,
        lng: 2.1946674306853113
      },
      saleOff: false,
      isAds: false,
      amenities: ['amenitie 1', 'amenitie 2', 'amenitie 3', 'amenitie 4', 'amenitie 5'],
      reviewStart: 4.75,
      reviewCount: 350
    },
    {
      name: 'Rappel en Sima de las Cotorras.',
      description:
        'Admira la belleza de un Cañón de más de 120 mts, haremos un descenso de 50 mts para conocer las pinturas rupestres y tendremos la oportunidad de observar una comunidad de cotorras que salen de la misma (únicamente en temporada de verano). Realizaremos un rappel en la cavidad circular de 180 metros de diámetro y 125 de profundidad, en donde también duermen cientos de cotorras que al amanecer salen en círculos ascendentes para regresar por la noche; al finalizar el ascenso se realiza un pequeño sendero perimetral en el interior de la sima observando algunas pinturas rupestres, posteriormente traslado a tu hotel.',
      currentBookings: [],
      featuredImage:
        'https://images.pexels.com/photos/2385654/pexels-photo-2385654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      galleryImgs: [
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        'https://images.pexels.com/photos/9786793/pexels-photo-9786793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/9709336/pexels-photo-9709336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      ],
      type: ['Art and culture', 'Leisure', 'Food and drink', 'Sports'],
      address: 'Calle Tarajal, 30, 35544 Guatiza',
      hasGroup: true,
      minPersonForGroup: 12,
      phoneNumber: '619 591 579',
      ratesForPerson: {
        adults: 15.5,
        kids: 9.0,
        babies: 3.0
      },
      map: {
        lat: 41.40706251243749,
        lng: 2.1946674306853113
      },
      saleOff: false,
      isAds: false,
      amenities: ['amenitie 1', 'amenitie 2', 'amenitie 3', 'amenitie 4', 'amenitie 5'],
      reviewStart: 4.75,
      reviewCount: 350
    }
  ]
};
export default data;
