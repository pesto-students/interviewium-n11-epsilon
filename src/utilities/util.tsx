export const ImageLinkCreator = (props: any) => {
  const imgProvider: any = (link: any) => {
    if (link && link.includes('zoom')) {
      return (
        <img
          src='https://www.zjonline.com.au/wp-content/uploads/2020/11/Zoom-Logo-PNG-Photo.png'
          alt={link}
          height={45}
          width={50}
        />
      );
    } else if (link && link.includes('calendly')) {
      return (
        <img
          src='https://logos-world.net/wp-content/uploads/2021/06/Calendly-New-Logo.png'
          alt={link}
          height={30}
          width={50}
        />
      );
    } else if (link && link.includes('meet')) {
      return (
        <img
          src='https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png'
          alt={link}
          height={35}
          width={35}
          style={{ margin: '0px 10px' }}
        />
      );
    } else {
      return (
        <img
          src='https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png'
          alt={link}
          height={50}
        />
      );
    }
  };

  return (
    <div>
      <a href={props.link} target='_black'>
        {props.link && imgProvider(props.link)}
      </a>
    </div>
  );
};

export const dateConverter = date => {
  if (!date) {
    return 0;
  }
  let dateConstrain = new Date(date);
  return (
    dateConstrain.getDate() + "/" +
    dateConstrain.getMonth() +
    1 + "/" +
    dateConstrain.getFullYear() +
    ' ' +
    ( '0' + dateConstrain.getHours()).slice(-2) + ":" +
    ( '0' + dateConstrain.getMinutes()).slice(-2)
  );
};
