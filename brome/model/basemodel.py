# from abc import ABCMeta, abstractmethod

from mongoalchemy.document import Document
from mongoalchemy.fields import (
    ModifiedField,
    CreatedField
)


# TODO make it a meta class
class BaseModel(Document):

    # TIMESTAMP
    created_ts = CreatedField(tz_aware=True)
    modified_ts = ModifiedField(tz_aware=True)

    # @abstractmethod
    async def sanitize_data(self, context):
        raise NotImplementedError()

    # @abstractmethod
    async def serialize(self, context):
        raise NotImplementedError()

    # @abstractmethod
    async def method_autorized(self, context):
        raise NotImplementedError()

    # @abstractmethod
    async def validate_and_save(self, context):
        raise NotImplementedError()

    async def is_new(self):
        return not hasattr(self, 'mongo_id')

    def get_uid(self):
        return str(self.mongo_id)
