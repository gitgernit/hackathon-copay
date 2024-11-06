__all__ = ['SQLModel']

# Initialize all models for SQLModel's __init_subclass__ to trigger
from sqlmodel import SQLModel

from .tokens import *
