import { cookies, headers } from "next/headers";

const { NEXT_PUBLIC_OPENCART_DOMAIN_URL, NEXT_PUBLIC_OPENCART_API_TOKEN } = process.env;

async function fetchAPI(query = '', cache: RequestCache = 'default', { variables }: Record<string, any> = {}, headers?: object) {
  let sesHeaders;
  const xsessionid = cookies().get("x-session-id")?.value;
  if (xsessionid) {
    sesHeaders = new Headers([
      ['Content-Type', 'application/json'],
      ['x-session-id', xsessionid]
    ]);
  }

  try {
    const res: any = await fetch(`${NEXT_PUBLIC_OPENCART_DOMAIN_URL!}/index.php?route=api/graphql/usage&token=${NEXT_PUBLIC_OPENCART_API_TOKEN}`, {
      method: 'POST',
      headers: sesHeaders,
      credentials: 'include',
      body: JSON.stringify({
        query,
        variables,
      }, null, 2),
      cache,
      // next: { revalidate: 60 }
    })

    const json = await res.json();
    
    if (json?.errors) {
      return json;
      // throw new Error('Failed to fetch API')
    }

    return json.data;
  } catch (e: any) {
    throw new Error(e)
  }

}

export async function createSession() {
  const data = await fetchAPI(`
  {
    session(id: "") {
      id
    }
  }
  `, 'no-store',);
  return data?.session?.id
}

export async function getCart() {
  const data = await fetchAPI(`
  {
    cart {
      weight
      tax
      total
      subtotal
      coupon_discount
      coupon_code
      has_stock
      has_shipping
      has_download
      totals {
        code
        title
        value
        sort_order
      }
      items {
        cart_id
        product_id
        name
        model
        shipping
        image
        quantity
        minimum
        price
        total
        reward
        points
      }
    }
  }
  `, 'no-store',);
  return data?.cart
}

export async function addItemToCart(product_id: number, quantity: number) {
  let qty = quantity ? quantity : 1;
  const data = await fetchAPI(`
    mutation {
      addItemToCart(input: {product_id: ${product_id}, quantity: ${qty}}) {
        weight
        tax
        total
        subtotal
        coupon_discount
        coupon_code
        has_stock
        has_shipping
        has_download
        totals {
          code
          title
          value
          sort_order
        }
        items {
          cart_id
          product_id
          name
          model
          shipping
          image
          quantity
          minimum
          subtract
          stock
          price
          total
          reward
          points
          tax_class_id
          weight
          weight_class_id
          length
          width
          height
          length_class_id
        }
      }
    }
  `, 'no-store',);

  return data?.addItemToCart
}

export async function removeFromCart(cart_id: any) {
  const data = await fetchAPI(`
    mutation {
      deleteCartItem(cart_id: ${cart_id})
    }
    `, 'no-store',);

  return data?.addItemToCart
}

export async function updateCartItem(cart_id: any, quantity: number) {
  const data = await fetchAPI(`
    mutation {
      updateCartItem(cart_id: ${cart_id}, quantity: ${quantity})
    }  
    `, 'no-store',);

  return data?.addItemToCart
}

export async function updateCart(id: number) {
  const data = await fetchAPI(`
    mutation {
      addItemToCart(input: ) {
        weight
        tax
        total
        subtotal
        coupon_discount
        coupon_code
        has_stock
        has_shipping
        has_download
        totals {
          code
          title
          value
          sort_order
        }
        items {
          cart_id
          product_id
          name
          model
          shipping
          image
          option 
          quantity
          minimum
          subtract
          stock
          price
          total
          reward
          points
          tax_class_id
          weight
          weight_class_id
          length
          width
          height
        }
      }
    }
  `, 'no-store',);

  return data?.addItemToCart
}

export async function getCategories(parent: number = 0) {
  const data = await fetchAPI(`
  {
    categories(parent: ${parent}) {
      category_id
      categories {
        category_id
        name
      }
      parent {
        category_id
      }
      name
      image
      top
      column
      status
      description
      meta_title
      meta_description
      meta_keyword
      products_count
    }
  }
  `);
  return data?.categories
}

export async function getCategory(id: number = 0) {
  const data = await fetchAPI(`
  {
    category(id: ${id}) {
      category_id
      name
      image
      top
      column
      status
      description
      date_added
      date_modified
      meta_title
      meta_description
      meta_keyword
      layout_id
      products_count
    }
  }
  `);
  return data?.category
}

export async function getProducts(parent: number) {
  const data = await fetchAPI(`
  {
    products(filter_category_id: ${parent} start: 0 limit: 300) {
      attributes {
        attribute_group_id
        name
        attribute {
          attribute_id
          name
          text
        }
      }
      product_id
      name
      description
      meta_title
      meta_description
      meta_keyword
      tag
      model
      sku
      upc
      mpn
      quantity
      image
      in_stock
      price
      special
      formatted_price
      formatted_special
      weight
      rating
      review_count
      minimum
      sort_order
      status
      wishlist
      images {
        product_image_id
        image
        sort_order
      }
    }
  }
  `);
  return data?.products
}

export async function getOrders(start: number, limit:number) {
  const data = await fetchAPI(`
  {
    orders(start: ${start}, limit: ${limit}) {
      order_id
      invoice_no
      invoice_prefix
      store {
        store_id
        name
        url
        ssl
      }
      products {
        order_product_id
        order_id
        product_id
        name
        model
        quantity
        price
        total
        tax
        reward
      }
      store_name
      store_url
      customer_id
      firstname
      lastname
      email
      telephone
      custom_field
      payment_firstname
      payment_lastname
      payment_company
      payment_address_1
      payment_address_2
      payment_postcode
      payment_city
      payment_custom_field
      payment_method
      payment_code
      shipping_firstname
      shipping_lastname
      shipping_company
      shipping_address_1
      shipping_address_2
      shipping_postcode
      shipping_city
      shipping_custom_field
      shipping_method
      comment
      total
      order_status_id
      order_status
      commission
      ip
      date_added
      date_modified
    }
  }
  `);
  return data?.orders 
}

export async function getOrder(id:number) {
  const data = await fetchAPI(`
  {
    order(id: "${id}") {
      order_id
      invoice_no
      invoice_prefix
      store {
        store_id
        name
        url
        ssl
      }
      products {
        order_product_id
        order_id
        product_id
        name
        model
        quantity
        price
        total
        tax
        reward
      }
      store_name
      store_url
      customer_id
      firstname
      lastname
      email
      telephone
      fax
      custom_field
      payment_firstname
      payment_lastname
      payment_company
      payment_address_1
      payment_address_2
      payment_postcode
      payment_city
      paymentZone {
        zone_id
        name
        code
        status
      }
      paymentCountry {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      payment_custom_field
      payment_method
      payment_code
      shipping_firstname
      shipping_lastname
      shipping_company
      shipping_address_1
      shipping_address_2
      shipping_postcode
      shipping_city
      shippingZone {
        zone_id
        name
        code
        status
      }
      shippingCountry {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      shipping_custom_field
      shipping_method
      shipping_code
      comment
      total
      order_status_id
      order_status
      affiliate_id
      commission
      date_added
      date_modified
    }
  }
  `);
  return data?.order
}



export async function getBestsellerProducts() {
  const data = await fetchAPI(`
    {
      bestsellerProducts(limit: 8) {
        product_id
        name
        price
        formatted_price
        model
        upc
        mpn
        stock_status
        image
      }
    }
  `);
  return data?.latestProducts
}

export async function getlatestProducts() {
  const data = await fetchAPI(`
  {
    latestProducts(limit: 10) {
      product_id
      name
      price
      formatted_price
      discounts {
        price
      }
      special
      formatted_special
      description
      model
      upc
      mpn
      stock_status
      image
    }
  }
  `);
  return data?.latestProducts
}

export async function getProduct(id: number) {
  const data = await fetchAPI(`
    {
      product(id: ${id}) {
        product_id
        name
        description
        meta_title
        meta_description
        meta_keyword
        tag
        model
        sku
        upc
        ean
        jan
        isbn
        mpn
        location
        quantity
        stock_status
        image
        in_stock
        price
        special
        formatted_price
        formatted_special
        reward
        points
        tax_class_id
        date_available
        weight
        weight_class_id
        length
        width
        height
        length_class_id
        subtract
        rating
        review_count
        minimum
        status
        viewed
        wishlist
        categories {
          category_id
          name
          meta_title
          meta_description
          meta_keyword
          products_count
        }
        attributes(language_id: 2) {
          attribute_group_id
          name
          attribute {
            attribute_id
            name
            text
          } 
        }
        options {
          product_option_id
          option_id
          name
          type
          value
          required
          in_stock
        }
        discounts {
          product_discount_id
          quantity
          priority
          price
          date_start
          date_end
        }
        images {
          product_image_id
          image
          sort_order
        }
        layout_id
      }
    }
  `, 'no-store',);
  return data?.product
}

export async function getInformations() {
  const data = await fetchAPI(`
  {
    informations {
      information_id
      bottom
      status
      title
    }
  }
  `);
  return data?.informations
}

export async function getInformationPage(id: number) {
  const data = await fetchAPI(`
    {
      information(id: "${id}") {
        information_id
        bottom
        sort_order
        status
        title
        description
        meta_title
        meta_description
        meta_keyword
      }
    }
  `);
  return data?.information
}

export async function LogIn(email: string, password: string) {
  const data = await fetchAPI(`
    mutation {
      login(email: "${email}", password: "${password}")
    }
  `, 'no-store',);

  return data?.login
}

export async function logOut() {
  const data = await fetchAPI(`
    mutation {
      logout
    }
  `, 'no-store',);

  return data?.logout
}

export async function editPassword(password: string, confirm: string) {
  const data = await fetchAPI(`
    mutation {
      editPassword(password: "${password}", confirm: "${confirm}")
    }
  `, 'no-store',);
  
  return data
}

export async function editCustomer(firstname: string, lastname: string, email:string, telephone:string) {
  const data = await fetchAPI(`
    mutation {
      editCustomer(
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          email: "${email}"
          telephone: "${telephone}"
          fax: ""
        }
      )
    }  
  `, 'no-store',);
  
  return data
}

export async function loggedIn() {
  const data = await fetchAPI(`
    {
      loggedIn {
        customer_id
        customer_group {
          customer_group_id
        }
        firstname
        lastname
        email
        telephone
        salt
        cart
        wishlist
        newsletter
        address_id
        custom_field
        ip
        status
        approved
        safe
        token
        code
        date_added
      }
    }
  `, 'no-store',);
  return data?.loggedIn
}

export async function getBanners(layout: string,position:string) {
  const data = await fetchAPI(`
    {
      banners(layout: "${layout}" position: "${position}") {
        banner_id
        name
        status
        banner_image_id
        language_id
        title
        link
        image
        width
        height
      }
    }
  `);
  return data?.banners
}

export async function getAddresses() {
  const data = await fetchAPI(` 
  {
    addresses {
      address_id
      firstname
      lastname
      company
      address_1
      address_2
      postcode
      city
      zone {
        zone_id
        name
        code
        status
      }
      country {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      custom_field
    }
  }
  `);
  return data?.addresses
}

export async function getShippingMethods() {
  const data = await fetchAPI(` 
  {
    shippingMethods {
      title
      quote {
        code
        title
        cost
        text
        details
      }
      sort_order
      error
    }
  }
  `);
  return data?.shippingMethods
}

export async function getPaymentMethods() {
  const data = await fetchAPI(` 
  {
    paymentMethods {
      title
      quote {
        code
        title
        cost
        text
        details
      }
      sort_order
      error
    }
  }
  `);
  return data?.paymentMethods
}