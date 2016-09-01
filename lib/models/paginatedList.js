'use strict'
class PaginatedList {

  constructor (manager, meta, resources) {
    this.manager = manager
    this.before = meta.cursors.before
    this.after = meta.cursors.after
    this.limit = meta.limit
    this.resources = resources
  }

}

module.exports = PaginatedList
