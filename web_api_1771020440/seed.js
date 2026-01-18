const pool = require('./config/database');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    const connection = await pool.getConnection();

    // Clear existing data
    await connection.execute('SET FOREIGN_KEY_CHECKS=0');
    await connection.execute('TRUNCATE TABLE reservation_items');
    await connection.execute('TRUNCATE TABLE reservations');
    await connection.execute('TRUNCATE TABLE tables');
    await connection.execute('TRUNCATE TABLE menu_items');
    await connection.execute('TRUNCATE TABLE customers');
    await connection.execute('SET FOREIGN_KEY_CHECKS=1');

    // Seed customers (5 customers)
    const customers = [
      { email: 'customer1@example.com', password: 'password123', full_name: 'Nguyễn Văn A', phone_number: '0912345678', address: '123 Đường ABC, TP.HCM' },
      { email: 'customer2@example.com', password: 'password123', full_name: 'Trần Thị B', phone_number: '0912345679', address: '456 Đường DEF, TP.HCM' },
      { email: 'customer3@example.com', password: 'password123', full_name: 'Lê Văn C', phone_number: '0912345680', address: '789 Đường GHI, TP.HCM' },
      { email: 'admin@example.com', password: 'admin123', full_name: 'Admin User', phone_number: '0987654321', address: 'Admin Office' },
      { email: 'customer4@example.com', password: 'password123', full_name: 'Phạm Thị D', phone_number: '0912345681', address: '321 Đường JKL, TP.HCM' }
    ];

    for (const customer of customers) {
  const hashedPassword = await bcrypt.hash(customer.password, 10);

  await connection.execute(
    'INSERT INTO customers (email, password, full_name, phone_number, address, loyalty_points) VALUES (?, ?, ?, ?, ?, ?)',
    [
      customer.email,
      hashedPassword,
      customer.full_name,
      customer.phone_number,
      customer.address,
      0
    ]
  );
}
console.log('✓ Seeded 5 customers');


    // Seed menu items (20 items)
    const menuItems = [
      // Appetizer (4 items)
      { name: 'Gỏi Cuốn Tôm', description: 'Gỏi cuốn tôm tươi với nước chấm đặc biệt', category: 'Appetizer', price: 50000, image_url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEhUQEhIVFRUXFR4aGBYXGBUWGBcWFRUYFhgVFRcYHSggGB4lHRUWIjEhJSktLi8uGB81ODMsNygtLisBCgoKDg0OGxAQGzImICYtLS0vLy4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAEgQAAIBAgQDBQQGBwUGBwEAAAECEQADBBIhMQVBUQYTImFxMoGRoQcUQrHR8CMzUmJyweEVQ1OCkhZUk6Ky0hc0Y3OD4vEk/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEDBAIFBv/EADgRAAICAQIDBgQGAQMEAwAAAAABAgMRBCESMUEFEyJRYXEygZGhFCOxweHw0UJS8QYVM2IkQ4L/2gAMAwEAAhEDEQA/APEaAKAKAKAKAKAKAKAKAKAKAKAKAKAWgCgCgCgFoAoAoAoAoAoAoAoBaASgCgEigCKASgCgCgCgCgCgCgCgCgCgCgCgCgCgFoAoBaAKAKAKActYd39lSa5ckupbCmyfwod+oXOYA9SK572JctDc+gfUX6r8ad7E6Wgu9PqL/Z1zoD7657+B3/2vUPkiOVI0Ohq1PO6MM4Sg+GS3EqTkSgEoAoBKAKAKAKAKAKAKAKAKAKAKAKAKAWgCgCgCgFoAoAoSuZZW8QAIn3CssovJ7cNRCMUsh34BooMPVVrqPXMQGAULrJOkV1JbHMdVBy2Np2O//hs3OJ3ba3LItm2VBBcG42QNkaJEjedjWGcXOXBHmarNZW60stbr7HneOuq7ll2r0qouMcM8jtC6F17nDkMCrDEFAc0AtAJQARQBQBQCUAUAUAUAUAUAUAtAFAEUAUAUAUAtAFAFATuFCW9qIFVyRZGWBLlo541OtTFCUh24Csep386SjtgQsxLJfvxJF4W+GVXW4bwZriu2V7RUfomWY9oT7vOqYRXHlltk3w7PYx1aTMFALNAc0AUAtCBKEhQBQBQBQCRQBFALQBQBQBQD+Cwdy+4t21Lu2wHxJPIADUk6CoclFZZKTbwi4xXZruI7/EW7ZPIhz5dATrzAjzrNHVKb8CbNEtNKC8TSGeKdm8Rh0F3w3LRE95bOYQY1IIBA1GsRqNdRVkL4TfDyfkyudMorPQpquKgoBaAKAKAseGAiGAmKpskk8NmmqqcllLIhEXZ85+ddwkiqdbzgn8YTMoIE+N+UHcEVZOccHNdM5PZF61xrnBmtd0gNq+GNwRnYXJAB8ht7hWBWR73BvlpLO7y0YOtx5wUAUBzNALQBQBQC0AUAUAUAUAUAlAFALQBQHpv0YYNLWHu4thqS2vMW7SG4wB5ewT6hDyrzNdKUpKqJv0ijGLmzzziWOfE3WvXD4nM+QHJV6ACAB5V6FcFCKiuhinJzk5M2n0Y4s3e8wbQw0uIragqDF63HRrbOI/emsetXDiz++hp0zzmJjuO4QWMTfsL7Nu86Dnojso19BW2DzFN+RlksNog10QLQC0AhoB+xeYCAaqlBNmym6UI4TH8NeY3FnXxD76mMEJ3SfMsuI5o1P96/8qm2PhOtNN8RrOy+Da9wjiX7vduOvgYkx8KwP/ybdD0bJPME+uTzNhXoo8KSw2FSciUAUAUAUAUAUAUAtCAoAigChIUAUAUAUB6R9GXFLbWbmDc/aYwN2tXbbWrgUc2GfNHOIEkivP1cXGSsRr07Uk4GE4zwu7g7rWLogjYj2XX7NxDzUjWa212KceKJmlFxeGav6NuHtbu/XrkqiDwTp3hJAJ/gGonqRvBjHrroqPd82zTpapSfFySKv6QFRMZcsrbC92TL65r3eHvRcflJDj4+gF+lUu7zJ5z9iq9x4sJGbrQUgKA7RCxAAknYDnRvG7OoxcmlFZbFv2WRirCCNxURaksomyuVcnCaw0IlQzuHIcte0I6j76hEsvMehNvMf8dwfXKPwrq74S3S/Gek/RXZW5w7iNqdTaPwyPr8a85bufsejqsxlU/U8XviGPrW+DykeResWSXqNV2UiUAtAFAFAFAFAFALQgKAKEhQBQC0AlAFAdW7jKQykgjYgwQeoIqGk9mE8bl0/a3GOgt3Gt3QDI7y1auFT1BZdD51StPBPw7exd38nz39yHxLjeJxMi5cJH7I0Gm09Y5TtUworg+JLfzE75zXC3t5F526f6wmDxoj9Lhgjkf4thirT/lKD3Vxp3hyh5P7MXLlLzMpWkpHcNhnunKiMx/dBMevT31y5KO7LaqbLZcNcW36Gr4LwNbA7+8wCj2m3Cj7SJ+28dNB868++92eCB9ToOz46FO61+NLOOkff++xmOJYgXbty4BlDuzBZmFJkLPOBAr0IR4YpeR8rdY7bHN82zqxa8JJG+3rXLZ3EYykGpBKs3GOhJOvXn1quZs03M0vAuLXsMHW25UXEKOOqncGsFieco9qNcZpKS5GT4haKuQa9GmWYnz2urcLX6kU1aYwoBaAKAKAWgEoAoBaAKAKAWgChAUAUJLXs9wgYpzncW7aKWZzGsfYSdMxn3CSdq5lJIlLJoMBg8JpltAKVJBuQ7khTEzIEkAGBzry77rc4z9D7fsrQ6KyhTjXl/8Atv7nLYaxBPdW4H7ij7hVatt/3M9afZ2gw33S29Bt+G4ZwD3SiehK/ca6WouT5lMuxezrI54MezwTfq1tsOMOwXu0fMqkvmzNIMMDtqSQTzrhXTVnHnd7FcuwtGko8La9+X/IxawOHXQWk94zH/mmplqLX1NNXY2gr+GtP33Hr2Ps2EIcLqNBrvO6IsAmNNZrmMLLXsNTbpdEsykorySWX/fkZvjvHruLIzE5RsP6DQDyGlepRp1Xu+Z8R2j2n+I/LqXDDy6t+bZW2reYgVc3g8yC6ljcECOlcFuCHcNAdWTXMjVS9y1wlY7D3NPuLxXB94uYbipot4Xgr12k76Gy3M4wjSvSTyfLSi4vDOaEC0ACgFoAoAoAoAoQFALQkKAWhAlCSywNzCIga4ty5czHweygURBzTJJM6RFVWKx7QeCyDgt5LI7i+PO4CqltEH2QOQ5Hb5AVXHTJPMm2zud7awkkif2fXF4nLbsYV7gL5c65giltTmeCFEamTtrXFuni3lyPT0HbE9NDgjHPzNr/AOH+ICHvL1pG/ZTvLhOoAkFFiZ/pWOU6oPn9j0l2tdZHChj/APX8E3/YHDLviL7joqpb5Ddjm2OadOnSTTLVQT2WSFq9Q1jZfclW+yGEXUJeiMs96IzGBmaLehnWNvKuHqE93HY7hrtTX8M9+eMfyRsZ2MsNiCVvXBZBUZFKC45aRCMyTOaOvrqK6jqIJ4UU/nucXa7V2LLm4v0Sx82VfEfo3wYXN9YxCOZIDm3eYjYSFVSp5kE+Whq99p8Cw4r2R5T0M7ZcTk36v+Sqxv0YXZjDX+9YgFUdO6LKVnMrZmB9PI1fHtCPFhxZnloZJZ4kVOP7JYrCgOuS8D/h58wETLIygxpuJrqGupm8Zx7nX4O6P+nPsVXEsHiLBHfWnt5tRmUgGROhOhrTGUZfC8lTWOZBUyda6IJeGtoVuMWIyxlGmstFGlg7rm00S8HdA5Visiz6DSWR8jW8HxuFXD3lu2O8uNAttJASD4jp7qxvbP8AcG6yE5zi4ywlzXmef8VA7wwIr19PngWT5XtSKWoeCHVx5wtAFAFAFAFAFAFCBaAWgCgChIUBO4Rwq9i7q2LKZ3aYEgaASSSdAABuahtRWWSk28I9Z7EfRktg28TiwHuDXuSFa2nk0/rWH+kHbNFY7NQ3tA0woS+M9AewZZsgUkjaJ0EATGnLY8hWGcZvLwbYOKSWRrJB2HvdU0gExI1P41Rw45/rgtc21t+mStxGKa4yliqpIQAaqoLwGdzoI8t6zym7WlskXRgq08bvmQMTxDOQhYsqGAB7BAOjREHYGaz22T5N7I011RS4ktwto7kDUdOh9BzrNmUnsWZjFBf4fkOo0P8ALqKiTcVhkwmpDzSyAFmJUwo0gLAMg7jUHTyqZ28UVltsiMeGbwlhgbGdMsElTmn90nQAHWOu/Laa6U5ShsuRG0Z5b5kTH4UX1Nu8oa2Y8AC5Rl2gEELHl51ZXq7ISzl/IS09co4wn7mR492EtEXLlgMrn9XbBC2yQfEDmBymJgSBMbCvWo7Uy0rOXmefZoMb1vfyMBjsFdwzm1dRkbQlW6ESD5ivZjNSjmLyedhqeGPYQ1RYevpGXNq5p7qxSjue3F7GZ4of0hr1KPgPke1Hm9kWrjzgoAoQFCQoAoAoAoBaEC0AUAUB0BQk9u+hHsui2TxC4AWuZltzHhtqxVjrsWYET0A6mqJviljoi2Oyz1PUrlxVhVH3CZ00B9RR4WyG73ZDx+JtqABqdvImOVVWuOCyvizkzF7iq5jLKAvI6zPvrBhZ3NfEyIb/ANYzS2Zc06ACDygGY2isFyk2a6pKPIkYTh9uQYEpPM6+oB1H9aqhX5lsrX5ki7h1c6opI202I/ZGw06VHDhvCIUvUkFlUAODrzM7xzJ2qGljxIJ7+ELGGVvswROvXXQ+kR8647qM9kv5JdkovLZJXhwj8KtWkSRV+JyyHdwQOo1BGnpVE9PjkaYXkW7hY8/I7VXwuJcp8R5v9J/B4y4vPEZbeQydCXYFTyiWkH79K9zsq/Z1NeqPO11fiVifozE4Vq9KxHemkWIu6Vncdz1lY8FDjLmZya9CpYifJ6yzvLmxmrDKFAFCAoAoSFAFAKKEBQC0AUAtALNCT3jsF2ispwzDAkHuwyskkDMtxyMxggSuVuftD1rytTa67MYz+h6Wl00ro7fz9CdZ7XX8SM9myuVpAaWLaEqRBUbGdCKyX6y6LxjD9smiOlpjzl+xfNhLioC9xWuRrCqQJgwsbdJFalGxQTct/ZGVuLltHYx/HMbiLfhVbIEzPcp8dRE1ilqJ8XBLHyRfGEUs/uZ23cxBJIYCNSVULz8hG56VxLgzg77z0OMFxvFO7WxikUrsCAzbdOY051bKEYRUuFndfjeE1k7vcf4gt1UTEWXJB2VZGUE6ifv6+VdQhXKLk00c3Putm0O2e2uJKoHvJLvkym0J5DMYMDxErEbg9NE9O22kunmZXq0mtjddl8Y15SLhKuDBUqFPrBEjfasEIrixxGrveNZwX+MvLYUMWOug26E/yrRbONSzkozxdDNp2qtE5Ltso+5Cw4E+mvyqrvFJZNNccrMR48UsPoH18wV320YCqpOL5HcLY5xky/0h21uYC7HLKwPpcUfcTV/ZzxqF8zvVeKr6HkmGSvdmzjTRJtwQPdVK5noWLETPmvRXI+Rl8TCpORKAWgFoBKEC0AUJChAtAFALQBQk9G7H4rAqEdcOhy5Q5YBrgMQzEttJZoKgDlyryNTO+Fu+eHyPf0um09tGa34lzzz/AODVcWxmFJzWrujILio03ERQ0ZlaSEUtOUNHloABi1PFa+OKaXL1yatJbXR+Va/mi77M3jZZVNhglxwJCjwPcIUkg6ZWMHTmSdZppNS+Lgl7fwUa+mtxdlc1n35mc7ZX8RhL57qbf8IYodScwk8+a7jL50ri4zlGT69H0PHfal8dpYkvVL9TvgfGbuJsOL6gsjgFgsaMJBy8jvz5VNlSyscn9i6OsViylgr72PdrvdYbKSD45UlchENKgS24GmvmNxEqqksz5dDLLUScsRKbivDsBhsR9VhgWtFw6ElM51Xw3JYgwSfHpGk6Vorsvtq7zK2f291j9CG4dcoODcLs22S9GV8xALrK+BQ7lFX2hGmo0JOvSL7pzi4Lljo9zmCilxFFexL4+9cVLIY3GK22jx/sqG84gn38ttkYLTwTcuW7OJPilsen9miwdB36kItu2X39lCNW2LMwJmvntQ9+JJptt/1eRuplLPPYs+K3rt5oBGVMwjcEmBJBEEiCIOmvxzd9lJT5l0pb5KW4QVVhbJ1YZlEkAQFzry57x0FWpYbTfy/wQrJcIXMEuQlnOYkEkaEQYiPOR8KmFu+EtjqmSg8y3M12jurdtnDd8LaxmzXJOcoTopBjKDvu08hAn1NJFw/M4cv06ZLNRcpvhjyMThzrXqzRp0zJN06e6qo8zZY/C2UJr0VyPkpc2FCDmgFFALQC0ICgCgFoAoBaAKEhQCjrQZweufRHZsXcI4GHz3UuyXdFKkEeAIxGuWCCvKfOvne2pWxknB/plF1cZS5HqOFwuQC5dBzM3hWdhJAJ8415661Xo9LwRjOxbvp+7/YhQayimx9jDX3u2nTM9oF8kknuzJN0IniaGaNt9qrs01sXN1LLyVOtv4uRhMRx7DHO9k92rAFgqdyXySRlDLlGs8idasprvTxZv7fwR3UtnHZGfsca7rELiLLqzlfGnUbMrbjYA6HlPKtc9O51OE+XmH+U+NPL9BrFW73fvdy/ry1yLjqSVJnKGMeIAgRoYjTarFw92oeW2396lb45yz5jOM7RMhtrbYpcQFUcAFgrtmjcrBLNrvBia6r0mU+NZXl/dzQspIcDd6q3LYZrijKzkRqvjLTtMakmdhrXDzB4ly8ii3jeMFr2b45bwz2Q4uMsHvBOhYZshA0BEEbnmazarS96pNfL9zRRNQaNBwu6wu3O7zXLdxs3i8DZHBOwnTfxDeJ0rz9RGLinLZr6bF9fFl46kXjj3bVwPbXLALN+lLa5j7VvNt+8BtA0irqOCyvEvltj6PAnmL2G+FvduFrrvAHtCCdOgA338zXNkYRxCKFWZSy2Z7jXFVtXLmHvL3qjYoZBDrM+KMp5xrB2NelRpnKKsrePctksSxnJl7B1r0Jm/TsfvHT3VVFbmu1+FlIa9Bcj5Z8woQEUAUAUATQCihAUAtALQBQBQkBQGn+jvDYO7jVGMBa0qM+USQzLGUOBqV1JjnAG01zKuVi4YvGTRpdPO+zggss9rxPa3B4ZB3KiAPCIAAA2Cqu21Z6ux6apcb3Z7VfZl0vDZt7F13bMLd2SZQMeklQaz21NWZR5UmsuPqYbtTx/FYVpwuFW5dueE3oYuoB0trkggc5kanbTXLWuOfim1jfCO/w0rFsYzifA+JY5+/u4ezZLOzl2OV2ztmGcFoaJgeEGAN62T1Vceb/Ymnshye7/AHKu5wK5hWzG4hYfsjMOnMeu1U/i4WeFLY9mr/p1cHE39irxuJvFszXnJ9Yj0A2rTCMMYUUefdoo1vGStHhYNuQZ111mavzlYMc6ootnxCW2VycpYQyjxRHtDQ/I1n7tyTiZuBdS/wAP2mwl2EupmgDISIKaTlLn2tTsfDpsZrFPQ2x3g/f1+R1FRxhjtvtDZt90VZbhUZwJdZvMQqh5UQEC7qT7UaTNR+DlJS4ts7fL036miEWtyZwnid27mt3La5ipJhsgDuc2dQRqZPUCIAHWjUUwhiUX9unkc4ed0SsPiHQhLugCttE+HKwzNznNI61TKEWuKHMvjRbjlt6GO7YYK5avDvGLFl0JQo0AnRuRImJBnr5+zo7FKvZY+eSpwlGW5U2TVsjdSx28dK4itzRbLwlQa3Hzb5hQgJoAmgCgEmgOhQCihAtAFALQBQkSgJ/BMR3d5Gys0nLCCWOYRCjmZjSocnHdG3s/V/hb1bjOD02/wSwixee9m1kKEUagEAZpIO/y9/jT7Wc3w4eT7aN1uofFWlh++TRYnt5dKBLaKqqAo3OgEDUQRp51zLtC17JJGGv/AKerUuKcslC/H3PsnL/CACfVhqfeTWKXey6/Q9SPZ1UFv9yHd4pM66/M1wtO3uy6NdSaWV9UUnE8UxEDc85FbKK0nuTqblCHDDdmbxGDcndf9Qr042RR8rfprZMLXC3Ybj1zKD8zR3xRxHs22aJ2F7Ou66HnzI+O1Uz10Yvc1R7EfCcjgFxPaSfQz8aPVwlyZNfZLi/FEkYfgrvC2wGY/ZkZvWOnnXD1C6l700ILKNxguzt57We6kXfCAwZixgjV1EydPaH361hsuWPDyMU6qpTSl5exI4hwlozlfCBDsV2y/bKgzG34CKoSkl4T0NJfCqCr5+Rlu0eGs3bea5efvkDAHu7jKyocqk3Mp00Ox56616OlnZFpJbP1Wx4/aair3w7ehjLZr0JFNTHLp0rmK3LbH4SrrYeC+YUIOJoAmgCaAJoDoGgOwaAUUAUAoFALloBCtAbz6J+DpevXL1y2YtgC3c1hbjSCANmbKSddoB3IryO2L5VUrheM8zmTwehdpeHhkuFcueczOcoAhRCat4mOZTAHPeK8fTrKTb/x8j0NJ2tdpns/CjGcVwzvaF7Dq3dFsrBQAyMEViC8Qyy8AyNj61vrdcXib36ZNT7a1N3Kbx9DrgHCsLxC3cwN1Mt8sxs3pY6ZZUO/7UqZB0IMDUCO7LbK5xnXvHqv3RkutnZ8ece5X4PscgsnO/cYi0/20bLdtOMy+JZDEGfEpOmhEQRNnaOWnFcUX5PdP/BZpvypZF41wu6iLcRS9sqNYgzOU+HmNiDzBFcUWwk+FvDPXXaC5MpVtLzaPI6H4Vqy+hatRW/9S+pM4bw5r7m3b8TKjOR0W2pZifhHqRXMm+pctXCCy2T7OGuBc3d3AsTmyNEGQDMbaH4Gs04vO57dOvqwouS+qGfrhGxqO6NnewZ2uMadz5a7U4EPy5c0T7HH8Uns37g/zfjXKjg4lodNPnBHOJ4ticR4XvXGHQkx7wNK6KJafT0LijFIoeKcaxdpGsIwFhgV0XUhwM2YnVSZPTc1uo09Tam/iPidbZOVspPkzO2zWuRVW8HVw1EUdzlsQa0nkPmEUIGqA6W2x2Un0BqHJI7jXOXJMVsO41KMPUGoU4vqdOi1buL+jOSpG4rorcWuaHsHhnvOtq2pd3YKqqJLMdAAKED2NwV3DubV5GtuuhVwVI9x++oTUllBpoLNvMQJAkgSdAJMSTyFSD0J/opvKBmxdrOTEKlwqOsuYO+ns15NvbGng8bs2V6KySyQsZ9GWOtkBGsXATEhysebB1GnpNWQ7W00upw9JauhKwP0YXiQcRiLSL/6ea43luFH31FnadS+E6jpJf6i5s/RlgW0N+/pqWzWogb/AN3WN9ry4sLH3NC0UMdTOdm+PWsDev4WyVuYd7oyXrrpbyqm75u7JkgAaEAwNNa36rTvUUpy2ePLJ5s4rLS5HpdjiBOVIs383iVUAczBbLJPtZdB4R7IHp86tNJYgufqjiVWx03FcL4LNybYdy0GUS4C5QBgNQui6HQhROlErMZSy0RXLgWOpX3cfg0xT4k2nV7Ba0gEC2LkNbzgDwk5MxMdNpArTF2KLjtuvn8zuMnJ7kZ8RbxOdmtrbRSPEpInOcoWGkSWgA+exrGoOvHDu/Lma6/FzFsYpb1t7BLABcoZhmII1TMR5r8q5lGUJqzz6FzkpR4WYbF8EN26FgXCZkZoBIOj6xpHyFe7VqMQ22POllPc3P0ecLWwz3bi3bd9VKPmDAXLYAZLvs+IgeGZHsmZ3rFrrbLI+Bpx57c158jrvMr1HOJXfreBxNiyynEZgHym9FpkJ2zW8xLDNsIOgmuKpx08o95lxe6fpj3L6m+JOLw/MxfZjhl23cd8Uhu2xbPtZRLsQECQZJ3PoGrdqbq51/lvDPQhr9Sv/sbHu0+CuJhkv4dVOVoeEBYBpy/A+X2l86q0NkZ2uFny3Lf+46qC8Ev3INji691NzDKrEAZwSYkDxJb2nXZj8dq0PTLjfDLK8v5PRh2rqXBcbx7HAtFzmLeHSBJHiKmNCTB0JgGuvh5Iptsc/ilkUcIuYwmxbK521BdvD4RmiQDrEgdfdXUbFV4pcjFfHjhhDn/htjh9qx7rh/7al9o0/wB/5M8aJlm/Y68mHWwbFu6RcL94pQXNVy92XLapzyxvWd6+LlnOC/uVjzGLXZd7YBeyE9Ygf5tjUPV55PJ3GiPkOf2L/wC38R+FcfiH6nfcoxnDOG2ij3S65kAOR4UkswUC2Ne8MSTtAHOvYsk2tjJpaIRkuJZHzdI9kVlwup7PHw/Ch61iLnNZFcuEehbXdPqixw+E+sAW2ss07ABjr5f0qnilB5izXOFNsMWrb1LDB9nP7PxeHvupsd3dR2ztBCBgW0kn2ZGo51b+JsXgmeRd2bpba3PT9Poek9osPh77Ml+0twFj4WExvqp3X1BFfMfir6r5Srljf+7FMdPCytKS6GE4j9G2HuE/V7z2TyS4O8TnpmHiXlvm/D19P281/wCZfNGO7s3bNbNrwHB4lMMlnEFHe2Mge2xbOigBGIYBg0aHfaZ1MYtcqrp95Rvks06nBcMzq7iYMH515Pds28PVETEXzMchVsYHLTMx2px+Ja02HwysTc8LsIAVDuMzQJO3oT5V7HZ1VUJ97a+XJepn1PG4cEFuyjwH0aY24MzlLa/5mPuByj517U+0YJZjFv7HmLSSeza/U9A4R2XvcPsILKd6yhmQkBDnbPq+XMY8WgEkjTzql299vOP3NEKq0uFyIXaG3fFlGv2CLtyxKi2jCLoVPAdSFg5yRpI22k5o6aqEsrOCa9JXLeLMN2q40XuL3TOv6NGfQp+myjPmEa6lzmG+etmn08VnO+eXsZ3U4PxIqMFxq4hhmzjwnK5JBe2WKMZ18JaYnWNaunRGS2WOe/vz+pKazuX+P7d3zbFq2tpNIZ8okg7wq5Qu567/AB8+HZNXHxyy/Jf85LXN4wtiiwPaDGd4oS4O8LeBgEUqSI0JEAb7+deh+GqiuLGMGZ4fM9iv8WNmzbSy4e+MoN7IFLPl8bi2QQFYEDavAdqVzlBYSM/d+LZGY+qXMFiG4riXS2ysS4E/pDeJUoI3HiYgQfZGmlaIapaj8mpZz6cvkae64d28HY7rEtZy3GBD5suwYkg6qY1K6LlPWs77ylSTjn9v71O4RTxh7lLxRsZaa6zEiy75DbDSAA0ozZhoZHIzOnlW+juJxiorxJc8fU2UvEs4M5jG7xs3ejKYBWRoYIBk7keY5mvQhiMcYFnFOec/IteF8AxVxGIt+EbXH8A1MZcx3BjYA/Os1+rqg02+fRbl1dM/h6mg4L2XxCMLt5lQqZUJ4tViGJI99eZqe06muGvf3NVNDzmZohiLiki4NfLeOpHL0rzZwi3lHcoL/SdrjxUqTXQq7sdOKUjeqnxHaj5Dne4fp8v6VdxPzYxLyPFfr46L8K+p7pnX4itdDtOKfurUOj1Oo6qHkTMNjJ5CqZ14N1MoyLjCY0rqpIPUEzWWSl5m+MK2t0OhRfuJbd8ve3FtlzqR3jBZ8zrz51ZRBysRk7RujTppY26I9cv9m1yIlokd2iqoYljCKAJbeYHnWXVaDvZuyDw30PmKNV3cVGS2M9i7zWiQykawWgxPk21eP+HknuerFqSymdWcWG51U65ReURKGeZHx0nxAk1bCTfMqcccisBe4wVAWYmAoGprVCGdicpLLL+x2XxFshtC28owgHyJirbNNdnwLPrkyrU1v+RcVjWtg96TI3kz8awzdk3wt7mmuEeaLjgvFjew9u6p0AKmP3Gy6/CffXo6rv4UxnB7pb+xjnTFWOLLRuKwvsieR2+MVVHtuXd4ccvz5FK0eZczE9pEwTE3LmHRrjMDIWWYjTUzttXNet1Fz22PRjpkl4uRkeM8MsXj4MKincgeGDt9nrPWt1Ooui/FP+/MrsopawZ692bIkGxGvJnBAAiDM+degtak939UjK9JF8mRLnZG/bAuxnQHUFWI/haCD91WLtCuT4eTKpaCSWVJMvML2hu4e2uSwiQpCgZmCsBAKjeOepmSddJrHPSVWzblJv6IjuZpZwv1ImNfEY8J9ZF5wDCZEW2ssYltYJ5STtVlaq02e6wvPLyWw0zn8eS14fgbeEXI1rFKsg+KSoYEMCuWQDMGRWa26y7xRlE2V6WiOzTNBGFXJcawHNzw5nEss7T3msGOVecne8x4uXTp9jYqYJpRNBgeD4UKHVbak8goze+B/Osc7LGvHZ8t2UznKMnFRJlzKNpOnPkeoFZ3NYxH7iKk92M3MSUUxHvAO/r611RKSlhfodd0pPc8+tt3hBzsWY7CZJOwA391e7wNbKJy7HzyWR4NihqbeIjoFY/LLNdd1P8A2or79eZEe6LZhnuKf2XEH4ZZqt1S/wBpPeh9eT/EPx/pXPcvyHenlRevqcHkd4zpblQ0dxsJ+EuVRZE9XS2l1hLk6CSeg1PwFY5wPXjekssdv8Fx2IIy2mRRszHKZ/aA3EctK0UyqqWW9z53tG+zVT4Y7RR7/wAC4ibmGS68d4EHeAHTOFh48p1HkRVcrVGLnHoYHW8qLI1/tJIywsH3/fvXh29sWyWIwS+5thoI5zkwXHsYEvZLVu34kByAQSZbVYM8thp5UoUr6+KS+hvXg2bZUXuLXV0gg/stKn571d+Ej1Ou9gXP0fcQNzGFXQiLTEbamUEDXeCfgatdUK1xZyZdU8w28z0DFcQAWBvO06j+tYrtXw1tRM9dDc8s8y7b8Qf9XbBZz05QYJb861PZtCfjm9j0LHwrw8yp7H9p7nDZtX5yMxaSCBJEETyr17oOzxVfNGXC5WfU3zdobFyx3ttgUBM66qQPZPn98ivnbNI4Wd3w4y8/L+DVTXmWcmfw+IN5ixG/yHKr5w4Fgvs32ReYTIFKqFDEgFoEjUH3bD4V3G7EcfcxSq3yLYxEeF9RyO8eR8q475tYZ0qlzRA4hicl11BEHlodGA/pULL3LOHYiYThlstLD0HzqJ3ySwiYwLdMYuWAdBIjbYwQKzOEs7lnD5Fo/DLVzQOWBg6gEEaESNKp75wljH3PIn2lOMnFw5eple2uW2isXYiToE9NyDIj0516egbsbWNzMu3qlNRcWvoM9lu0iXiLZuKW5DYt/lOs9ajX6CUPGlse1TrqNSvC9/XY2du0SJjTryrx+7njONiZTSeDNdtccbarYt+3cMaAkhdiVjnJUD18q9PsylSk7Jcl+p1FvAx2N4f9VbPeQq4MeKJA5RBMD516tlj7xeRmnjh2OOLvjLFxmFt7tsklXSSSCZgiSwYekdKvUHzTM/FHGMDFrtfbuDusQsjmt+2SB7yPCfMxVqU/f5nDS6HccM/wbf8Ax3/76Z/9SN/M8ZCNGxr2GjzFKSBCOcj3Vy0+hbGa6j9i8ARudR061y4l0dRw8sm3TjmJtEBcpEDQoBzndcp6VmdcHzQds/MtcL2nvbtZQiORYfI5q4dETuN0i74f2py5v0bLIhspVhsdxA++aos0+U0nzO1YnzRUYztUlp8jo6qdnGoI9IkHy++vO/7TPHheTZHV1r4sohcRx2FxTB++t6KAA0oRBJ+0B1NXU0XUx4eF/LcmVtc3tIVeHi5EAXB1BDe+RM127HHnsQo55G54D2YNvu7tnEqLkfq7q5RqIKFwWn3eWlFTG5eGa3+X8FU7XHwzi8F5xDAYoKD3QbX7Dgx/ryn4CsF/ZWoW+zXuWUamhvDePdGJxPAcQrFjadmZpnU6k7CF2G29dKM9o8LXy/k1ysre6kiz4fwDM3dYqw6krI7s22gGfbBOnLTetENMoyxNtexjle2sww/cTE9gMAkshxVsnfIFUNH7QEA7860ysUI7tv3SZxCUm8rC9m0Np2JsjVMfiFB2Bt2yB/pGvOuHKiS8S+z/AMs64r1y/VfwcXux177HFLZ6C5YIPxDj7q54dL6fXH6ojvNR5fb/AAxhOzHEpypjsKfXMNfLU1Cp0snhb/NHXfXRWXH7Mcv9leLDUnCnzLXVPu/RfzqfwVS81/fc6jrm+i+v8Da9leIsZe9hl9Gut8u7FR+HpS2/Q6Wsn/t+/wDAq9jcX/vduf4XJ186l11eR2tXLy+5aYPhOKshhcu2rixAyhkI5nMSdQfKCDrrJByajTxlHZbr1/g8/XaeGpzJbS+mfmU3H+KEYd1/vVZIJGrMHCggERMFZ3Byneap01H56fTc+esjKL4XHdY3ZQcc7OWnW3eRhau3BKgewWVCxXT2WzCNPPQ6V6Gm1U4ScJLiivrzNsa4OOc4Y/2c7X4hwMNcuMLiyM2mZwAZRyQZIEw25A30kxq9HGP5ta26/wCT0+z9TGT7q3d9P8FzgsYwxNm7c1AJU+RZWC+mp+6slEVFYierfPMcdBnth2isd73uHvNcyqA4UE25k/aPhMzus6jWeXozq4pL+s8la2EE1zIeD7c27ejLcHllUiN/2tKsrqmjPPWV+qNEMThsYgLKIYTqIK+U7g9RUuCZfC14yiv/ANmML+18rf4Vz3T/ANxZ3z8jyxcLXtHlZO/qIPKmBk6ThqdBUNHSZLOM8RBMGYg6baT5+6s7iXKRZYe/Osj3x8a4aOkydhLk7xHPXy1qtnaH8baR7fjGhOx9SIk5eo1os9CX6mU4pwk2vEviX5jyMVfGeSmUcFUCVOddGHMaH4iu+ezOU2t0W/CO0OMwpm1feOasxdT/AJSfuqqVUH0RZG2a6m64J28xDjKGCmdVGnwDAr01Iqlx7vlyL1JWcxzF/STxOzINqw6g+2FYb6iYYqp84qd5LZ4HDBc038zjD/Sdecy6EdYCsPllrNZVdnPEn8i6EqMfC18y2sfSOh9pivraYj5NWdx1S5YLP/jvzLnBdoPrSZrd60wPXQjlBUtI9CK54dS+aX9+ZK7joPPg71w5jiQNZhUQjz1yj76h1TfxY+jOlOC+FP6kW92fDanF3iegygf6UA09TXMqK/T6ZLY3yXQetYO/YgpdXQ7E5c3kQCRrtXEKJ1vMZfL+BOyFiw4lwlxWjMhB/aAke+NB66Vt4VL0MTzEZx+HIXODI6rqKqurlFZ6Hdc4yeOpkOLlj4h4wPzoPwrzeNTlhs1cDSyVVjjdoyriVOjLsRry/A1dKia3XM87VR445jz/AF9DnimHDYZ7llywVlu2ts1q7bj2piQwgFuUV1TZw3KM1jZp+qZ8xTiMn3e2+6fNP/BR8auJbe7dGUKvdXUJEFCCyFBp5KPfWzTpzjGPun6+p6tdmfEuhF7Rdpkug2rQbJu8iCxnRBqdJgk+lW6bROt8UufT0Nut1vF+XD5lTdx7NbW17ILBmMbmTp6DSB5VpVSjNz+R5zliOCXwfgWJxzuLEMbaZpc5VzfYWebHUxtodq7jKKW+xFcJWPboVGIwuP4a/wCkW7YadyPCx9dUufOtOITXmafEiR/thjP8Rf8AStc9xDyOu8kTVUkzFaCgfWyelMg7awdJE+/+tAN3eFC57QB95+UVGUSRjwCPZZh6Np/zVDSYyztOH4lPZvf6lH3g9K4dcWdqySHkxOMTdUcdA0Ez/ENN5Fcdwuh33z6od/tVh+ssXBPRQ4n1X31w6ZLkdq6PUp+Jdw4JRgrc1OnTkdqmPEnuiJcLWURXYTBjSpwQd27mQ5lMGoazzJTwX/COLrcZhcGug5ajLEa+tU2VtJYL67Mt5JGN7O98C9gFW5JBIMx7JExHw9K4jZheLkLOGO7eCHhezOMuHKHtZv2O8zNH/wAYZfnXEtVUuSb+Rg/HVZwnkn4fsxjk1zWVIn+8zBugGVSPjFVT1lEeefoWR1lfRllw61dAJZGs3BOxMaZTKkGDOU8+dSrYv4JZNddkbFsTLXEcUuiX35DxQ2w1nMDqR1mCa64vNF3ID2kxiMINp9YlkIhQYLSrQBv8KKEHziS7JLkyZZ7a3Cy2zbh2MAhsyAZS0+ICDoNI5+VV31qNbnF7osok52KMiNjuI4m8dL9xHXWUMEAcjqBGomsVdsoS4pb58+R6ctPCUeFbGe7RYvFd09wYq8YInTuzq2WQUiNY0jr51s0/dzsSlBfqYtXVKuvMZMyHf3XOZ7ruerOzbepr0uGKWIpL5HkZbeWzY9l792yhvW7q5dQ9tx4SBr4mmBoenP4eRrK4TahKPs1zLL+ylq6+9hJRkuv7P0GMRjrWJul8ItxXtQXTNb7phm+w4nwnWZ0irq6p0w4bmmnyeHn5o83T12QeLcPHk/4M7iO7e48/oxPiAnQ7N7CkHX0B1rfHKiuoecnf1rKDbz5hykROkyBlzDfpXPdZfFg5UW9i94B2i+roF9mNyqkAzzM8zprNVW1tvK/U113RhHGDZYPtohhLhEHkw0PxEGqlxItV9T6kn+0+Hf7vhv8Ah2fwrrvZFng8zzW3c/PlXrGEfW9+dKEgcXHX8/kUA4MYBufh+FASbWKzDnyqCSTavAfd/wDtQSdm+g3igFOplRPpEf0qUyGKbIYQwB8mgj5+ldZRGCHiezVm59kKeqeH7oHyNRhDcqcR2Ouj9XeB8n0+Y/Co4UTlnPCOx2NvXVQFFDMAbkscu2oAEsY1ge+BJFc3GOzIdnDzPVrHZq1aw62nv3GSRnud2wLQQSQpEAkhQqkwokksTWK/g4ct4XsZ9Qu+WJPYtrPDMF3S90ES1OgPiLONM2IAUzGkJqupJnSJjXVKCcP77nHdVqOERMXZTCOGe2t2YhpJGSdWtyYkjadBHKsFkVTPM4po5UFB8iq7Totts9pVe2/sO/6QmROzaDpEfZrjU1Rg8w+FncINS8LwUd6UJMqQrawNPssDvKqQv9Jmu6Ls+F8z1qrHjEmRccoYEFRyGUyG1ysd9NCxgacq2FxFtEi7azKRDEch9g7EHyA9w9KrvX5Ui7TPFsS0w9lbUknluJc69CdNIPmNfOvLlKU8Jf4PaSwV/E+IYdbTJecLnUjLJa5BmCBGmsHbp7tFFNvGpQWcfJGfU3UqDjN8/qedvfb7I99e+orqfMuTzsJ37EQxJEzlkgT1jaanCW6HE2sMtuzGMtJfCXFHd3BkYaHmGQiRE5lUa8ieRNUamE3W+F7rcjw53LAp3atBJOdhzXL+k9teYlAQV29kjY1QpKTS/v8AfUzvHIoLPFDk7tllDrl2g/u9K1SpXFxJ7kOL6M4W6NQq/j6eddNPqzlxZNwOOa2QHBKTtr6wapsqUt1zOOFZyazu8N/ir/xLn41jxLyNXDAyiYrpXsAdGL59KAQXaAeW6KEj6YgVAJAxEwfT871BI+cVpqJ/PmaEjtrEwNPzzoQSUxf5/P50oCZZxgO/58vz0qQP/WCRodNOh5x+Z60BoeB8SZrhW4bfd5IVQpW2vjVl7wEnMDABffxT5VmlXCO73M80luy9x3HrFgtmfEYZwCclwO9sxrAMsrA7Trvy2qHOMdstfoczsjHnlfoY3FdtQbzJgrAvmJL289oHyFt80COQYSW0FVd3Fbrb9DjLfJFNx3tZib+S0UfC5SYRlOXXmZUMB5Ceuu1cWJTWJbo7Sy8Pb9CHa4hfGjllIOYAyVmCufowIkH+lZZVwxwrkXxhwvluaS2ivaNwlVuCFZNzrBg8oIIYTvXmtOuXD06Grh8Oepj+0eAbD3VyYod3cErnzMqnmhaCQAMpEjYxupn3tFbG6HiWGjmUpRezOPqWOzLcXLdHLLdUq2hEyQOvzrVKiMouJ1DUShJS8iPjG4oy5HW6iD7NsMfOMwJJ+NVR0tUHlRy/UunrLrFhywvQqGw2T2lIP7wIPzq3LM+xwEFdHI53K8xQgaOEVtgfdJqU2Q0XmGwl/EqEy5dIZ2kFvMztI3669YquNKUuJHPAluSW7JWgv6xs0xIAiTtoRrV+A0isxHZvELIUhtPskAxvtUcJzhFecHiU/wASPew/nUOC8hwobm9+UH4Vz3cfIjhRGF4irTo6780B19YoBRifWgHFxnrQDgx7UJHVx/n8J+dQB9MfQEi3xCgJVviA60GSZb4h50JyWGG4rlIIYgzyPu1NQ1nmQ0nzL/DcfvFO7DoV5LdQXFEawFBUAVw61yOOBFVxrFcRuqEtYu3ZRd1sW2sdNWKszGB5xUqEV0HCZPFcCxxOY4kP5m5cJPuI3pwQ8ieFC4W3xFWDpfRiT9og/EOvh+VVT0tM1hxOk2ifZ4pi7ZYHC2WaPEVZkB5bT58qyT7NhL/U/wBTtT9CBxDFY2+Mosqo3A9sg9QXJy8/jWirSRrecshsj4XC4zD6hinUDxT101HvrUC7HG1Ag97IOpIMchMK0TUZJOf7aULDAaD2bgYTzmZI+NCMiWrlq5vhrR03UT575fSpwgcG1gp8SoPQ3Rr6QKYRGSbhsRat6WwvQFSM08p50A4uODj29QT92wAbca10DlsYJgMPInSB5zrUkES5j1WQSNeYI302jWPKhAf2ggGp59Dppvt5/KmQdf2gn7//ADf9tAYAVAFoAoBRQBQDlrnQCVAOhQkdt70A+tAS7fL886AlYbehJZ2dx/EPvFQCV/8Ab+dAPW/YPqf+miIM1xbl/CP51IK/Bb/H7q5JJtn9YfT+VSC7wuy+hqQUmL39w/lXLJJz/wDl39f5UBI4dsvr/KpOSLxTl6n/AKhQFLd/nQktcL+rX3/9ZqUAv7H0/nUnIo/Vr+edCSHjPZ9zfyoQQaA//9k=',preparation_time: 10, is_vegetarian: false, is_spicy: false },
      { name: 'Cánh Gà Nướng', description: 'Cánh gà nướng vàng giòn', category: 'Appetizer', price: 60000, preparation_time: 15, is_vegetarian: false, is_spicy: true },
      { name: 'Gỏi Cuốn Chay', description: 'Gỏi cuốn rau fresh', category: 'Appetizer', price: 40000, preparation_time: 10, is_vegetarian: true, is_spicy: false },
      { name: 'Xiên Nướng', description: 'Xiên nướng thịt bò thơm ngon', category: 'Appetizer', price: 55000, preparation_time: 12, is_vegetarian: false, is_spicy: false },
      
      // Main Course (8 items)
      { name: 'Phở Bò', description: 'Phở bò truyền thống Hà Nội', category: 'Main Course', price: 80000, image_url: 'https://images.unsplash.com/photo-1604908177522-040a1a4eaf18', preparation_time: 20, is_vegetarian: false, is_spicy: false },
      { name: 'Cơm Gà Xối Mỡ', description: 'Cơm gà Hainanese', category: 'Main Course', price: 90000, preparation_time: 15, is_vegetarian: false, is_spicy: false },
      { name: 'Bún Chả', description: 'Bún chả nướng thơm ngon', category: 'Main Course', price: 75000, preparation_time: 18, is_vegetarian: false, is_spicy: true },
      { name: 'Mực Nướng', description: 'Mực nướng mỡ hành', category: 'Main Course', price: 120000, preparation_time: 20, is_vegetarian: false, is_spicy: false },
      { name: 'Cơm Rượu', description: 'Cơm rượu gà thơm lừng', category: 'Main Course', price: 85000, preparation_time: 25, is_vegetarian: false, is_spicy: false },
      { name: 'Tôm Sú Nướng', description: 'Tôm sú nướng với bơ tỏi', category: 'Main Course', price: 180000, preparation_time: 18, is_vegetarian: false, is_spicy: false },
      { name: 'Cơm Rau', description: 'Cơm chiên rau tươi', category: 'Main Course', price: 65000, preparation_time: 12, is_vegetarian: true, is_spicy: false },
      { name: 'Canh Chua Cá', description: 'Canh chua cá basa chua ngon', category: 'Main Course', price: 95000, preparation_time: 22, is_vegetarian: false, is_spicy: false },
      
      // Soup (3 items)
      { name: 'Súp Nấm', description: 'Súp nấm hương thơm', category: 'Soup', price: 45000, preparation_time: 12, is_vegetarian: true, is_spicy: false },
      { name: 'Súp Tôm', description: 'Súp tôm chua cay', category: 'Soup', price: 55000, preparation_time: 15, is_vegetarian: false, is_spicy: true },
      { name: 'Súp Cua', description: 'Súp cua béo ngậy', category: 'Soup', price: 65000, preparation_time: 20, is_vegetarian: false, is_spicy: false },
      
      // Beverage (3 items)
      { name: 'Cà Phê Đen Đá', description: 'Cà phê đen đá vừa', category: 'Beverage', price: 20000, preparation_time: 5, is_vegetarian: true, is_spicy: false },
      { name: 'Nước Cam Ép', description: 'Nước cam ép tươi mỗi ngày', category: 'Beverage', price: 30000, preparation_time: 5, is_vegetarian: true, is_spicy: false },
      { name: 'Nước Chanh Tươi', description: 'Nước chanh tươi thanh mát', category: 'Beverage', price: 25000, preparation_time: 3, is_vegetarian: true, is_spicy: false },
      
      // Dessert (2 items)
      { name: 'Chè Đậu Xanh', description: 'Chè đậu xanh mát lạnh', category: 'Dessert', price: 30000, preparation_time: 3, is_vegetarian: true, is_spicy: false },
      { name: 'Kem Hoa Quả', description: 'Kem hoa quả tươi ngon', category: 'Dessert', price: 40000, preparation_time: 5, is_vegetarian: true, is_spicy: false }
    ];

    for (const item of menuItems) {
  await connection.execute(
  `INSERT INTO menu_items 
  (name, description, category, price, image_url, preparation_time, is_vegetarian, is_spicy, is_available) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)`,
  [
    item.name,
    item.description,
    item.category,
    item.price,
    item.image_url,
    item.preparation_time,
    item.is_vegetarian,
    item.is_spicy
  ]
);

}
console.log('✓ Seeded 20 menu items');


    // Seed tables (8 tables)
    const tables = [
      { table_number: 'T01', capacity: 2 },
      { table_number: 'T02', capacity: 2 },
      { table_number: 'T03', capacity: 4 },
      { table_number: 'T04', capacity: 4 },
      { table_number: 'T05', capacity: 6 },
      { table_number: 'T06', capacity: 6 },
      { table_number: 'T07', capacity: 8 },
      { table_number: 'T08', capacity: 8 }
    ];

    for (const table of tables) {
      await connection.execute(
        'INSERT INTO tables (table_number, capacity, is_available) VALUES (?, ?, true)',
        [table.table_number, table.capacity]
      );
    }
    console.log('✓ Seeded 8 tables');

    // Seed reservations (10 reservations)
    const now = new Date();
    const reservations = [
      { customerId: 1, date: new Date(now.getTime() + 2*24*60*60*1000), guests: 2, status: 'pending', specialRequests: 'Bàn gần cửa' },
      { customerId: 2, date: new Date(now.getTime() + 3*24*60*60*1000), guests: 4, status: 'confirmed', specialRequests: 'Không cay' },
      { customerId: 1, date: new Date(now.getTime() + 4*24*60*60*1000), guests: 3, status: 'seated', specialRequests: null },
      { customerId: 3, date: new Date(now.getTime() + 1*24*60*60*1000), guests: 2, status: 'completed', specialRequests: 'Tổ chức sinh nhật' },
      { customerId: 2, date: new Date(now.getTime() + 5*24*60*60*1000), guests: 6, status: 'pending', specialRequests: 'Bàn góc' },
      { customerId: 1, date: new Date(now.getTime() + 1*24*60*60*1000), guests: 4, status: 'completed', specialRequests: null },
      { customerId: 3, date: new Date(now.getTime() + 6*24*60*60*1000), guests: 2, status: 'cancelled', specialRequests: 'Đã hủy' },
      { customerId: 2, date: new Date(now.getTime() + 7*24*60*60*1000), guests: 8, status: 'pending', specialRequests: 'Tiệc công ty' },
      { customerId: 5, date: new Date(now.getTime() + 2*24*60*60*1000), guests: 3, status: 'confirmed', specialRequests: null },
      { customerId: 1, date: new Date(now.getTime() + 8*24*60*60*1000), guests: 2, status: 'pending', specialRequests: 'Bàn yên tĩnh' }
    ];

    let resIndex = 1;
    for (const res of reservations) {
      const resNumber = `RES-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(resIndex).padStart(3, '0')}`;
      
      const [result] = await connection.execute(
        'INSERT INTO reservations (customer_id, reservation_number, reservation_date, number_of_guests, status, special_requests) VALUES (?, ?, ?, ?, ?, ?)',
        [res.customerId, resNumber, res.date, res.guests, res.status, res.specialRequests]
      );
      
      const reservationId = result.insertId;

      // Add items to reservation
      const itemsPerReservation = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < itemsPerReservation; i++) {
        const menuItemId = Math.floor(Math.random() * 20) + 1;
        const quantity = Math.floor(Math.random() * 3) + 1;
        
        const [menuItem] = await connection.execute(
          'SELECT price FROM menu_items WHERE id = ?',
          [menuItemId]
        );
        
        if (menuItem.length > 0) {
          await connection.execute(
            'INSERT INTO reservation_items (reservation_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
            [reservationId, menuItemId, quantity, menuItem[0].price]
          );
        }
      }

      // Calculate totals
      const [items] = await connection.execute(
        'SELECT SUM(price * quantity) as subtotal FROM reservation_items WHERE reservation_id = ?',
        [reservationId]
      );

      const subtotal = items[0].subtotal || 0;
      const serviceCharge = subtotal * 0.1;
      const total = subtotal + serviceCharge;

      await connection.execute(
        'UPDATE reservations SET subtotal = ?, service_charge = ?, total = ? WHERE id = ?',
        [subtotal, serviceCharge, total, reservationId]
      );

      resIndex++;
    }
    console.log('✓ Seeded 10 reservations with items');

    connection.release();
    console.log('\n✓ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
