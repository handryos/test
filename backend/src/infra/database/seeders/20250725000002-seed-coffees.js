'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingCoffees = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM coffees',
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (existingCoffees[0].count > 0) {
      return;
    }

    await queryInterface.bulkInsert(
      'coffees',
      [
        {
          name: 'Classic Espresso',
          description:
            'Rich and bold espresso with a perfect crema. Made from premium arabica beans with notes of dark chocolate and caramel.',
          type: 'Espresso',
          price: 2.5,
          image_url:
            'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cappuccino Deluxe',
          description:
            'Creamy cappuccino with steamed milk foam and a sprinkle of cinnamon. Perfect balance of espresso and milk.',
          type: 'Cappuccino',
          price: 3.75,
          image_url:
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vanilla Latte',
          description:
            'Smooth latte with vanilla syrup and artistic latte art. Made with organic milk and premium vanilla extract.',
          type: 'Latte',
          price: 4.25,
          image_url:
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Caramel Macchiato',
          description:
            'Layered macchiato with caramel drizzle and steamed milk. Sweet and indulgent with a perfect coffee balance.',
          type: 'Macchiato',
          price: 4.5,
          image_url:
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Colombian Single Origin',
          description:
            'Premium single-origin coffee from Colombian highlands. Bright acidity with notes of citrus and chocolate.',
          type: 'Filter Coffee',
          price: 3.25,
          image_url:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iced Mocha',
          description:
            'Refreshing iced coffee with chocolate syrup and whipped cream. Perfect for hot days with rich chocolate flavor.',
          type: 'Iced Coffee',
          price: 4.0,
          image_url:
            'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('coffees', null, {});
  },
};
