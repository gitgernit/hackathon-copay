__all__ = ['SQLModel']

# Initialize all models for SQLModel's __init_subclass__ to trigger
from sqlmodel import SQLModel

from .base import *
from .group import *
from .invite import *
from .ofd import *
from .telegram import *
from .tokens import *
from .user import *
