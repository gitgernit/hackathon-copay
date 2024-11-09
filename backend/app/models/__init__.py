__all__ = ['SQLModel']

# Initialize all models for SQLModel's __init_subclass__ to trigger
from sqlmodel import SQLModel

from .base import *
from .event import *
from .item import *
from .ofd import *
from .telegram import *
from .tokens import *
from .transactions import *
from .user import *
