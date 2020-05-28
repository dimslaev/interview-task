export async function fetchData(url, options) {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
}

export function isChildElement(childEl, parentEl) {
  let parentNode = childEl.parentNode;
  while (parentNode !== null) {
    if (parentNode === parentEl) {
      return true;
    }
    parentNode = parentNode.parentNode;
  }
  return false;
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month} ${year}`;
}
