const statusList = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INVALID_VALUES: 422,
  BAD_REQUEST: 400,
  DELETED: 204,
};

const mapStatus = (status) => statusList[status] || 500;

module.exports = {
  mapStatus,
};