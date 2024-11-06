__all__ = ['SQLModel']

# Initialize all models for SQLModel's __init_subclass__ to trigger
from .tokens import *

from sqlmodel import SQLModel
