/*global localStorage*/

const _ = require('lodash');

const getRegionData = () => {
  const data = localStorage.getItem('regionData');
  if (data !== null) {
    return JSON.parse(data);
  }
  return undefined;
}


const setRegionData = (data) => {
  localStorage.setItem('regionData', JSON.stringify(data));
}

const prossessRegionData = (provinceName, cityName, countryName) => {
  const data = getRegionData();
  let province = {};
  let city = {};
  let country = {};
  if (data && provinceName) {
    province = _.head(_.filter(data,
      (item) => { return item.Name === provinceName && item.LevelType === 1 }));
    if (province && cityName) {
      if (cityName === '省直') {
        city = { ID: -10 }
      } else {
        city = _.head(_.filter(data,
          (item) => { return item.Name === cityName && item.LevelType === 2 }));
      }
      if (city && countryName) {
        if (countryName === '市直') {
          country = { ID: -100 }
        } else {
          country = _.head(_.filter(data,
            (item) => { return item.Name === countryName && item.LevelType === 3 }));
        }
      }
    }
  }
  return _.concat([], province && province.ID, city && city.ID, country && country.ID);
}

const prossessRegionName = (ids) => {
  const data = getRegionData();
  const selectProps = {};
  _.forEach(ids, (item) => {
    const selectItem = _.head(_.filter(data, (select) => { return select.ID === item }));
    if (selectItem && selectItem.LevelType) {
      switch (selectItem.LevelType) {
        case 1:
          _.assign(selectProps, { province: { value: selectItem.Name } }, { city: { value: '' } }, { county: { value: '' } });
          break;
        case 2:
          _.assign(selectProps, { city: { value: selectItem.Name } }, { county: { value: '' } });
          break;
        case 3:
          _.assign(selectProps, { county: { value: selectItem.Name } });
          break;
        default:
      }
    }
    if (item === -10) {
      _.assign(selectProps, { city: { value: '省直' } });
    }
    if (item === -100) {
      _.assign(selectProps, { county: { value: '市直' } });
    }
  })
  return selectProps;
}

const GlobalUtils = {
  getRegionData,
  setRegionData,
  prossessRegionData,
  prossessRegionName,
}
export default GlobalUtils;//
