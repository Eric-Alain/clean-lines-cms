//Serialize string
export const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

//Modify Cloudinary urls if provided in order to optimize them (size, performance, format, cropping etc)
export const adjustForCloudinary = (str, width, type) => {
  if (/https.*?cloudinary/.test(str)) {
    return str.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, `$1c_mfit,c_scale,f_auto,q_auto:eco,w_${width}/$2.${type}`);
  } else {
    return str;
  }
};

//Convert slugs to sentence cased strings
export const slugToString = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map((i) => i[0].toUpperCase() + i.substr(1))
    .join(' ')
    .replace(/(^\w{1}|\.\s*\w{1})/gi, (replaced) => {
      return replaced.toUpperCase();
    });
};

//Test an array for..., well... objects
export const testArrayForObjects = (arr) => {
  return arr.some((i) => {
    return typeof i === 'object';
  });
};
